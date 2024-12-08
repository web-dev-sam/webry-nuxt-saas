<script lang="ts" setup>
definePageMeta({
  layout: "blank",
})

const responseFinished = ref(false)
const errorOccurred = ref(false)
const statusMessage = ref("")

const { $csrfFetch } = useNuxtApp()
const route = useRoute()
const token = route.query.token
$csrfFetch(`/api/verify?token=${token}`, {
  method: "GET",
  onResponse({ response }) {
    responseFinished.value = true
    errorOccurred.value = response.ok
    statusMessage.value = response.statusText
  },
  onResponseError({ response }) {
    responseFinished.value = true
    errorOccurred.value = true
    statusMessage.value = response.statusText
  },
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <div v-if="!responseFinished">
      <Icon name="line-md:loading-alt-loop" class="text-8xl" />
    </div>
    <div v-else class="text-center space-y-4">
      <h1 class="text-5xl font-bold">
        {{ errorOccurred ? "Failed to verify" : "Email verified" }}
      </h1>

      <p v-if="statusMessage" class="text-xl mb-1">
        {{ statusMessage }}
      </p>

      <NuxtLink class="ml-2" :to="errorOccurred ? '/settings' : '/dashboard'">
        <UiButton v-if="!errorOccurred" variant="ghost" size="lg"> Back to Settings </UiButton>
        <UiButton v-else variant="ghost" size="lg"> Dashboard </UiButton>
      </NuxtLink>
      <NuxtLink class="ml-2" :to="errorOccurred ? '/dashboard' : '/settings'">
        <UiButton v-if="!errorOccurred" variant="neutral" size="lg">
          <Icon name="lucide:layout-dashboard" class="mr-2" />
          Dashboard
        </UiButton>
        <UiButton v-else variant="neutral" size="lg">
          <Icon name="lucide:settings" class="mr-2" />
          Settings
        </UiButton>
      </NuxtLink>
    </div>
  </div>
</template>
