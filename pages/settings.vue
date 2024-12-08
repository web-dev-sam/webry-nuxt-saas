<script setup lang="ts">
import type { Provider } from "~/types/auth"
import { z } from "zod"
import { MAX_EMAIL_LENGTH, MAX_USER_NAME_LENGTH } from "~/utils/defaults"

definePageMeta({
  layout: "internal",
  middleware: "auth",
})

const { $csrfFetch } = useNuxtApp()
const { query } = useRoute()
const { user } = useUserSession()
const { toast } = useToast()

if ("connect-account-conflict" in query) {
  toast({
    variant: "destructive",
    title: "Account Conflict",
    description: STATUS_MESSAGES_CONNECT_ACCOUNT.CONFLICT_OTHER_ACCOUNT,
  })
} else if ("connect-account-failed" in query) {
  toast({
    variant: "destructive",
    title: "Account Connection Failed",
    description: wrapUnknownClientError(),
  })
}

const deleteConfirmation = ref("")
const confirmingDeletion = ref(false)
const isDeleting = ref(false)
const deleteDialogOpen = ref(false)
const disconnectDialogOpen = ref(false)
const disconnectingProvider = ref<Provider>("Google")
const isDisconnecting = ref(false)
const madeProfileChanges = ref(false)
const invalidEmail = ref(false)
const invalidUsername = ref(false)
const savingProfile = ref(false)
const verifyingEmail = ref(false)

const { data, status, refresh } = useFetch("/api/settings", {
  method: "GET",
})

async function requireLoggedIn() {
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) {
    return await navigateTo("/login", {
      external: true,
    })
  }
}

async function connectAccount(provider: Provider) {
  await requireLoggedIn()

  window.location.href = `/api/connect/${provider.toLowerCase()}`
}

async function disconnectAccount(provider: Provider, sure = false) {
  await requireLoggedIn()

  if (!sure) {
    disconnectingProvider.value = provider
    disconnectDialogOpen.value = true
    return
  }

  isDisconnecting.value = true

  void $csrfFetch("/api/account-disconnect", {
    method: "POST",
    body: { provider },
    onResponse() {
      disconnectDialogOpen.value = false
      isDisconnecting.value = false
      void refresh()
    },
    onResponseError({ response }) {
      disconnectDialogOpen.value = false
      isDisconnecting.value = false

      switch (response.statusText) {
        case STATUS_MESSAGES_SETTINGS.ONLY_ONE_PROVIDER_CONNECTED:
          toast({
            variant: "destructive",
            title: "Only One Provider Connected",
            description: STATUS_MESSAGES_SETTINGS.ONLY_ONE_PROVIDER_CONNECTED,
          })
          break
        default:
          toast({
            variant: "destructive",
            title: "An Error Occurred",
            description: wrapUnknownClientError(response.statusText),
          })
      }
    },
  })
}

async function startedDeletingAccount() {
  await requireLoggedIn()
  confirmingDeletion.value = true
}

async function deleteAccount() {
  await requireLoggedIn()

  if (deleteConfirmation.value.trim().toLowerCase() !== "delete my account") {
    return toast({
      variant: "destructive",
      title: "Incorrect Confirmation",
      description: "Please type in 'delete my account'.",
    })
  }

  isDeleting.value = true
  await $fetch("/api/account", {
    method: "DELETE",
    onResponse: (response) => {
      if (response.error != null) {
        toast({
          variant: "destructive",
          title: "An Error Occurred",
          description: wrapUnknownClientError(),
        })
        isDeleting.value = false
        deleteConfirmation.value = ""
        return
      }

      window.location.href = "/"
    },
  })
}

async function saveProfileChanges() {
  if (data.value == null) {
    return
  }
  await requireLoggedIn()

  savingProfile.value = true
  await $csrfFetch("/api/account", {
    method: "PATCH",
    body: {
      user_name: data.value.user_name,
      email: data.value.email,
    },
    onResponse: (res) => {
      if (!res.error) {
        madeProfileChanges.value = false
        toast({
          variant: "success",
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        })
      }
      savingProfile.value = false
    },
    onResponseError({ response }) {
      const errors = response.statusText.replace(STATUS_MESSAGES.INVALID, "").split(", ")
      invalidEmail.value = errors.includes("email")
      invalidUsername.value = errors.includes("user_name")

      savingProfile.value = false
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: wrapUnknownClientError(response.statusText),
      })
    },
  })
}

async function verifyEmail() {
  await requireLoggedIn()
  verifyingEmail.value = true

  await $csrfFetch("/api/account-verify-email", {
    method: "POST",
    onResponse: (res) => {
      verifyingEmail.value = false
      if (!res.error) {
        toast({
          variant: "success",
          title: "Email Verification Sent",
          description: "A verification email has been sent to your email address.",
        })
      }
    },
    onResponseError({ response }) {
      verifyingEmail.value = false
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: wrapUnknownClientError(response.statusText),
      })
    },
  })
}
</script>

<template>
  <div>
    <section role="heading">
      <h1 class="text-xl font-semibold text-center">Settings</h1>
    </section>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <section class="py-4 space-y-4">
        <div class="px-6 py-4 mb-8 border-b border-border">
          <h2 class="text-lg font-medium">Profile Information</h2>
        </div>
        <div>
          <div class="px-6">
            <div class="flex items-center mb-8">
              <NuxtImg
                :src="user?.profile_picture ?? createProfilePicture()"
                :fallback="createProfilePicture()"
                class="w-20 h-20 rounded-full bg-gray-200 bg-gradient-to-r from-purple-500 to-pink-500"
              />
              <div class="ml-6">
                <p class="text-sm text-muted-foreground">Profile Picture</p>
              </div>
            </div>
          </div>
          <div class="px-6 space-y-4">
            <div v-if="status === 'success' && data" class="space-y-2">
              <UiLabel for="username">Username</UiLabel>
              <UiInput
                id="username"
                v-model="data.user_name"
                placeholder="Your username"
                :class="{ 'ring-destructive': invalidUsername }"
                :schema="z.string().min(0).max(MAX_USER_NAME_LENGTH).optional()"
                @input="madeProfileChanges = true"
              />
            </div>
            <UiSkeleton v-else class="w-24 h-9" />

            <div v-if="status === 'success' && data" class="space-y-2">
              <UiLabel for="email">
                Email
              </UiLabel>
              <div class="flex gap-2">
                <UiInput
                  id="email"
                  v-model="data.email"
                  type="email"
                  placeholder="your@email.com"
                  :class="{ 'ring-destructive': invalidEmail }"
                  :schema="z.string().min(0).max(MAX_EMAIL_LENGTH).email().optional()"
                  @input="madeProfileChanges = true"
                />
                <UiButton
                  v-if="!data.email_verified"
                  variant="neutral"
                  size="default"
                  class="text-nowrap"
                  @click="verifyEmail"
                >
                  <Icon v-if="verifyingEmail" name="heroicons:arrow-path" class="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Verify Email
                </UiButton>
              </div>
              <p
                v-if="!data.email_verified"
                class="text-sm"
                :class="data.email_verified ? 'text-green-600' : 'text-muted-foreground'"
              >
                Please verify your email address
              </p>
            </div>
            <UiSkeleton v-else class="w-24 h-9" />
          </div>
          <div class="px-6 pt-6 flex justify-end">
            <UiButton
              v-if="madeProfileChanges"
              variant="primary"
              @click="saveProfileChanges"
            >
              <Icon v-if="savingProfile" name="heroicons:arrow-path" class="animate-spin -ml-1 mr-2 h-4 w-4" />
              Update Profile
            </UiButton>
          </div>
        </div>
      </section>

      <section class="py-4 space-y-4">
        <div class="px-6 py-4 mb-8 border-b border-border">
          <h2 class="text-lg font-medium">Connected Accounts</h2>
        </div>
        <div class="px-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="text-gray-500">
                  <Icon name="fe:google" size="26" class="ml-[-1px]" />
                </div>
                <div>
                  <p class="text-sm font-medium">Google</p>
                  <p class="text-sm text-gray-500">Connect your Google account</p>
                </div>
              </div>
              <UiSkeleton v-if="status !== 'success'" class="w-24 h-9" />
              <div v-else>
                <UiButton
                  v-if="data?.providers.google"
                  variant="outline-secondary"
                  @click="disconnectAccount('Google')"
                >
                  <Icon name="octicon:unlink-16"></Icon>
                </UiButton>
                <UiButton v-else variant="neutral" @click="connectAccount('Google')"> Connect </UiButton>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="text-gray-500">
                  <Icon name="simple-icons:github" size="24" />
                </div>
                <div>
                  <p class="text-sm font-medium">GitHub</p>
                  <p class="text-sm text-gray-500">Connect your GitHub account</p>
                </div>
              </div>
              <UiSkeleton v-if="status !== 'success'" class="w-24 h-9" />
              <div v-else>
                <UiButton
                  v-if="data?.providers.github"
                  variant="outline-secondary"
                  @click="disconnectAccount('Github')"
                >
                  <Icon name="octicon:unlink-16"></Icon>
                </UiButton>
                <UiButton v-else variant="neutral" @click="connectAccount('Github')">Connect</UiButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-4 space-y-4">
        <div class="px-6 py-4 mb-8 border-b border-border">
          <h2 class="text-lg font-medium text-red-600">Danger Zone</h2>
        </div>
        <div class="px-6">
          <p class="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back.</p>

          <UiDialog v-model:open="deleteDialogOpen">
            <UiDialogTrigger as-child>
              <UiButton variant="outline-filled-destructive" @click="startedDeletingAccount"> Delete Account </UiButton>
            </UiDialogTrigger>
            <UiDialogContent class="sm:max-w-[425px]">
              <UiDialogHeader>
                <UiDialogTitle class="mb-1">Delete Account</UiDialogTitle>
                <UiDialogDescription>
                  This action is irreversible. Please type in <strong>"delete my account"</strong> to confirm deletion.
                </UiDialogDescription>
              </UiDialogHeader>
              <div class="grid gap-4 py-2">
                <div class="grid grid-cols-4 items-center gap-4">
                  <UiInput v-model="deleteConfirmation" placeholder="delete my account" class="col-span-4" />
                </div>
              </div>
              <UiDialogFooter>
                <UiDialogClose>
                  <UiButton variant="outline-secondary">Cancel</UiButton>
                </UiDialogClose>
                <UiButton
                  variant="destructive"
                  :disabled="deleteConfirmation.trim().toLowerCase() !== 'delete my account'"
                  @click="deleteAccount"
                >
                  <Icon v-if="isDeleting" name="heroicons:arrow-path" class="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Delete Account
                </UiButton>
              </UiDialogFooter>
            </UiDialogContent>
          </UiDialog>
        </div>
      </section>

      <UiDialog v-model:open="disconnectDialogOpen">
        <UiDialogContent class="sm:max-w-[425px]">
          <UiDialogHeader>
            <UiDialogTitle class="mb-1">Disconnect {{ disconnectingProvider }}</UiDialogTitle>
            <UiDialogDescription>
              Are you sure you want to disconnect your {{ disconnectingProvider }} account?
            </UiDialogDescription>
          </UiDialogHeader>
          <UiDialogFooter>
            <UiDialogClose>
              <UiButton variant="ghost">Cancel</UiButton>
            </UiDialogClose>
            <UiButton variant="neutral" @click="disconnectAccount(disconnectingProvider, true)">
              <Icon v-if="isDisconnecting" name="heroicons:arrow-path" class="animate-spin -ml-1 mr-2 h-4 w-4" />
              Disconnect
            </UiButton>
          </UiDialogFooter>
        </UiDialogContent>
      </UiDialog>
    </div>
  </div>
</template>
