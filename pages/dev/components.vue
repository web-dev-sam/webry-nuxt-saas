<script setup lang="ts">
// Imports
// Props & Emits
// State
// Computed
// Normal code
// Lifecycle
// Watchers
// Functions
</script>

<template>
  <div class="text-center">
    <h1 class="font-semibold text-3xl mb-16 pt-16">Components</h1>
    <div class="flex flex-wrap justify-center gap-16">
      <section class="flex flex-col gap-8">
        <div>
          <h2 class="font-medium text-2xl mb-6">Buttons</h2>
          <p class="text-gray-500 mb-3">Filled</p>
          <div class="flex flex-wrap justify-center gap-4">
            <UiButton variant="default">Default</UiButton>
            <UiButton variant="secondary">Secondary</UiButton>
            <UiButton variant="destructive">Destructive</UiButton>
            <UiButton variant="ghost">Ghost</UiButton>
          </div>
        </div>
        <div>
          <p class="text-gray-500 mb-3">Outline</p>
          <div class="flex flex-wrap justify-center gap-4">
            <UiButton variant="outline-default">Default</UiButton>
            <UiButton variant="outline-secondary">Secondary</UiButton>
            <UiButton variant="outline-destructive">Destructive</UiButton>
            <UiButton variant="outline-ghost">Ghost</UiButton>
          </div>
        </div>
        <div>
          <p class="text-gray-500 mb-3">Outline <Icon name="tabler:arrow-right" class="text-xs"></Icon> Filled</p>
          <div class="flex flex-wrap justify-center gap-4">
            <UiButton variant="outline-filled-default">Default</UiButton>
            <UiButton variant="outline-filled-secondary">Secondary</UiButton>
            <UiButton variant="outline-filled-destructive">Destructive</UiButton>
            <UiButton variant="outline-filled-ghost">Ghost</UiButton>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
