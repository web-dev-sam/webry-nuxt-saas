<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)
const { loggedIn } = useUserSession()

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  },
)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <div>
    <nav v-if="mobileMenuOpen" class="sm:hidden">
      <div class="flex flex-col gap-4 text-center items-center fixed inset-0 bg-background z-50 text-lg justify-center">
        <div class="flex justify-between w-full px-12 py-12">
          <button aria-label="Close mobile menu" @click="toggleMobileMenu">
            <Icon name="ph:x" :size="24" mode="svg" class="text-gray-600 dark:text-foreground" />
          </button>
        </div>
        <NuxtLink :to="loggedIn ? '/dashboard' : '/'" class="hover:text-gray-900 dark:hover:text-gray-400 px-8 py-4" @click="toggleMobileMenu">{{ loggedIn ? "Dashboard" : "Home" }}</NuxtLink>
        <NuxtLink to="/features" class="hover:text-gray-900 dark:hover:text-gray-400 px-8 py-4" @click="toggleMobileMenu">Features</NuxtLink>
        <NuxtLink to="/pricing" class="hover:text-gray-900 dark:hover:text-gray-400 px-8 py-4" @click="toggleMobileMenu">Pricing</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-gray-900 dark:hover:text-gray-400 px-8 py-4" @click="toggleMobileMenu">Contact</NuxtLink>
        <div class="flex-1"></div>
      </div>
    </nav>
    <div class="container">
      <header
        class="my-10 text-gray-700 dark:text-foreground md:container"
      >
        <nav class="flex justify-between align-middle items-center h-9">
          <div class="flex items-center relative dark:hover:text-green-400 sm:hidden">
            <button class="p-4 rounded-full" aria-label="Open mobile menu" @click="toggleMobileMenu">
              <Icon name="ph:list" :size="22" mode="svg" />
            </button>
          </div>
          <div class="flex items-center">
            <NuxtLink :to="loggedIn ? '/dashboard' : '/'" :aria-label="loggedIn ? 'Dashboard' : 'Home'">
              <CommonLogo class="h-9" aria-hidden="true" />
            </NuxtLink>
          </div>
          <div class="hidden sm:flex gap-8">
            <NuxtLink :to="loggedIn ? '/dashboard' : '/'" class="hover:text-gray-900 dark:hover:text-gray-400 px-4 py-4 sm:hidden md:block">{{ loggedIn ? 'Dashboard' : 'Home' }}</NuxtLink>
            <NuxtLink to="/features" class="hover:text-gray-900 dark:hover:text-gray-400 px-4 py-4">Features</NuxtLink>
            <NuxtLink to="/pricing" class="hover:text-gray-900 dark:hover:text-gray-400 px-4 py-4">Pricing</NuxtLink>
            <NuxtLink to="/contact" class="hover:text-gray-900 dark:hover:text-gray-400 px-4 py-4 sm:hidden md:block">Contact</NuxtLink>
          </div>
          <div class="flex items-center">
            <NuxtLink
              to="/login"
              aria-label="Login"
              class="text-gray-600 hover:text-gray-800 dark:text-foreground relative dark:hover:text-green-400 p-4 rounded-full"
            >
              <div
                class="w-12 h-12 bg-gray-100 dark:bg-gray-700/50 rounded-full absolute ml-3 mt-3 -translate-x-1/2 -translate-y-1/2 -z-10 hidden sm:block"
              ></div>
              <Icon name="ph:sign-in" :size="22" mode="svg" />
            </NuxtLink>
          </div>
        </nav>
      </header>
      <main class="min-h-[calc(100vh-207px)] md:container">
        <!-- TODO: Remove nonesense min-h when more content -->
        <slot />
      </main>
      <footer>
        <div class="md:container mx-auto py-8">
          <div class="flex justify-between items-center gap-4 text-muted-foreground">
            <div class="items-center gap-2 md:flex hidden">
              <span class="text-sm">&copy; 2025 Webry</span>
            </div>

            <div class="flex gap-8 text-sm">
              <NuxtLink to="/legal/privacy" class="hover:text-gray-900 dark:hover:text-gray-300">
                Privacy
              </NuxtLink>
              <NuxtLink to="/legal/terms" class="hover:text-gray-900 dark:hover:text-gray-300">Terms</NuxtLink>
              <NuxtLink to="/contact" class="hover:text-gray-900 dark:hover:text-gray-300 hidden sm:block md:hidden">Contact</NuxtLink>
            </div>

            <div class="flex gap-6">
              <NuxtLink to="https://dev.to/samuel-braun" target="_blank" aria-label="Dev.to">
                <Icon name="simple-icons:devdotto" size="20px" class="hover:text-gray-800 dark:hover:text-gray-300" />
              </NuxtLink>
              <NuxtLink to="https://github.com/web-dev-sam/webry-nuxt-saas" target="_blank" aria-label="GitHub">
                <Icon name="simple-icons:github" size="20px" class="hover:text-gray-800 dark:hover:text-gray-300" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
