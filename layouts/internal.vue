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
      class="flex justify-between my-10 align-middle h-9 items-center text-gray-700 dark:text-foreground md:container"
    >
      <div class="flex items-center">
        <NuxtLink to="/dashboard" aria-label="Home">
          <CommonLogo class="h-9" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="flex gap-16">
        <NuxtLink to="/dashboard" class="hover:text-gray-900 dark:hover:text-gray-400">Dashboard</NuxtLink>
      </div>
      <div class="flex items-center relative gap-8">
        <Icon name="heroicons:bell" class="w-6 h-6 hidden md:block" />
        <NuxtImg
          :src="userPicture"
          :fallback="createProfilePicture()"
          class="h-9 w-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
          role="button"
          @click="userSettingsOpen = !userSettingsOpen"
        ></NuxtImg>
        <UiCommand v-model:open="userSettingsOpen" class="rounded-lg shadow-md w-[16ch] absolute top-12 right-0">
          <UiCommandList class="my-2 mx-1">
            <NuxtLink to="/getting-started" class="block" aria-label="Getting Started">
              <UiCommandItem value="Getting Started" class="py-2 cursor-pointer">
                <Icon name="tabler:rocket" class="mr-2 h-4 w-4" />
                <span>Getting Started</span>
              </UiCommandItem>
            </NuxtLink>
            <NuxtLink to="/settings" class="block" aria-label="Settings">
              <UiCommandItem value="Settings" class="py-2 cursor-pointer">
                <Icon name="tabler:settings-2" class="mr-2 h-4 w-4" />
                <span>Settings</span>
              </UiCommandItem>
            </NuxtLink>
            <UiCommandItem value="Logout" class="py-2 cursor-pointer" role="button" aria-label="Logout" @click="logOut">
              <Icon name="tabler:logout-2" class="mr-2 h-4 w-4" />
              <span>Logout</span>
            </UiCommandItem>
          </UiCommandList>
        </UiCommand>
      </div>
    </header>
    <main class="min-h-[calc(100vh-207px)] md:container">
      <!-- TODO: Remove nonesense min-h when more content -->
      <slot />
    </main>
    <footer class="text-muted-foreground">
      <div class="md:container mx-auto py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center gap-2"></div>

          <div class="flex gap-8 text-sm ">
            <NuxtLink to="/legal/privacy" class="hover:text-gray-900 dark:hover:text-gray-300">Privacy</NuxtLink>
            <NuxtLink to="/legal/terms" class="hover:text-gray-900 dark:hover:text-gray-300">Terms</NuxtLink>
          </div>

          <div class="flex gap-6"></div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped></style>
