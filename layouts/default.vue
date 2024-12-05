<script setup lang="ts">
// Props & Emits
// State
// Computed
// Normal code
// Lifecycle
// Watchers
// Functions
</script>

<template>
  <div class="container">
    <header
      class="flex justify-between my-10 align-middle h-9 items-center text-gray-700 dark:text-foreground container"
    >
      <div class="flex items-center justify-start">
        <NuxtLink to="/" tabindex="-1" aria-label="Home">
          <CommonLogo class="h-9" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="flex gap-8">
        <NuxtLink to="/" class="hover:text-gray-900 dark:hover:text-gray-400 px-4 py-4">Home</NuxtLink>
        <NuxtLink to="/features" class="hover:text-gray-900 dark:hover:text-gray-400 px-4 py-4">Features</NuxtLink>
        <NuxtLink to="/pricing" class="hover:text-gray-900 dark:hover:text-gray-400 px-4 py-4">Pricing</NuxtLink>
        <NuxtLink to="/contact" class="hover:text-gray-900 dark:hover:text-gray-400 px-4 py-4">Contact</NuxtLink>
      </div>
      <div class="flex items-center">
        <NuxtLink
          to="/login"
          aria-label="Login"
          class="text-gray-600 hover:text-gray-800 dark:text-foreground relative dark:hover:text-green-400 p-4 rounded-full"
        >
          <div
            class="w-12 h-12 bg-gray-100 dark:bg-gray-700/50 rounded-full absolute ml-3 mt-3 -translate-x-1/2 -translate-y-1/2 -z-10"
          ></div>
          <Icon name="ph:sign-in" :size="22" mode="svg" />
        </NuxtLink>
      </div>
    </header>
    <main class="min-h-[calc(100vh-207px)] container">
      <!-- TODO: Remove nonesense min-h when more content -->
      <slot />
    </main>
    <footer>
      <div class="container mx-auto py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-muted-foreground">
          <div class="flex items-center gap-2">
            <span class="text-sm">&copy; 2025 Webry</span>
          </div>

          <div class="flex gap-8 text-sm">
            <NuxtLink to="/legal/privacy" class="hover:text-gray-900 dark:hover:text-gray-300">
              Privacy
            </NuxtLink>
            <NuxtLink to="/legal/terms" class="hover:text-gray-900 dark:hover:text-gray-300">Terms</NuxtLink>
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
</template>

<style scoped></style>
