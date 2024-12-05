<script setup lang="ts">
const { user, clear: clearSession } = useUserSession()
const userSettingsOpen = ref(false)

// Session can start with a null profile picture (image error, so take a default)
// When logging out for a short time, the profile picture is null (so keep the user picture)
const userPicture = ref(createProfilePicture())
watch(
  () => user.value?.profile_picture,
  (newPicture) => {
    if (newPicture) {
      userPicture.value = newPicture
    }
  },
  { immediate: true },
)

async function logOut() {
  await clearSession()
  await navigateTo("/", {
    external: true,
  })
}
</script>

<template>
  <div class="container">
    <header
      class="flex justify-between my-10 align-middle h-9 items-center text-gray-700 dark:text-foreground container"
    >
      <div class="flex items-center">
        <NuxtLink to="/dashboard">
          <CommonLogo class="h-9" />
        </NuxtLink>
      </div>
      <div class="flex gap-16">
        <NuxtLink to="/dashboard" class="hover:text-gray-900 dark:hover:text-gray-400">Dashboard</NuxtLink>
        <NuxtLink to="/getting-started" class="hover:text-gray-900 dark:hover:text-gray-400">Getting Started</NuxtLink>
      </div>
      <div class="flex items-center relative gap-8">
        <Icon name="heroicons:bell" class="w-6 h-6" />
        <NuxtImg
          :src="userPicture"
          :fallback="createProfilePicture()"
          class="h-9 w-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          role="button"
          @click="userSettingsOpen = !userSettingsOpen"
        ></NuxtImg>
        <UiCommand v-model:open="userSettingsOpen" class="rounded-lg shadow-md w-[16ch] absolute top-12 right-0">
          <UiCommandList class="my-2 mx-1">
            <NuxtLink to="/settings" class="block">
              <UiCommandItem value="Settings" class="py-2 cursor-pointer">
                <Icon name="tabler:settings-2" class="mr-2 h-4 w-4" />
                <span>Settings</span>
              </UiCommandItem>
            </NuxtLink>
            <UiCommandItem value="Logout" class="py-2 cursor-pointer" role="button" @click="logOut">
              <Icon name="tabler:logout-2" class="mr-2 h-4 w-4" />
              <span>Logout</span>
            </UiCommandItem>
          </UiCommandList>
        </UiCommand>
      </div>
    </header>
    <main class="min-h-[calc(100vh-207px)] container">
      <!-- TODO: Remove nonesense min-h when more content -->
      <slot />
    </main>
    <footer>
      <div class="container mx-auto py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600">
          <div class="flex items-center gap-2"></div>

          <div class="flex gap-8 text-sm text-gray-600">
            <NuxtLink to="/legal/privacy" class="hover:text-gray-900 dark:hover:text-gray-400">Privacy</NuxtLink>
            <NuxtLink to="/legal/terms" class="hover:text-gray-900 dark:hover:text-gray-400">Terms</NuxtLink>
          </div>

          <div class="flex gap-4 text-gray-600"></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
