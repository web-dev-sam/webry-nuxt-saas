<script setup lang="ts">
import type { NuxtError } from "#app"

const _ = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4">
    <div class="text-center">
      <h1 class="text-9xl font-bold mb-4">
        {{ error?.statusCode || "404" }}
      </h1>

      <p class="text-xl mb-1">
        {{ error?.statusMessage || "Page not found" }}
      </p>

      <p class="text-muted-foreground mb-8">
        {{ error?.message || "Sorry, we couldn't find the page you're looking for." }}
      </p>

      <UiButton variant="ghost" size="lg" @click="$router.back()"> One step back </UiButton>
      <NuxtLink class="ml-2">
        <UiButton variant="neutral" size="lg">
          <Icon name="heroicons:home" class="mr-2" />
          Go Home
        </UiButton>
      </NuxtLink>
    </div>
  </div>
</template>
