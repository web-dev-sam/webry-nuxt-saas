<!-- components/FeatureCard.vue -->
<script setup lang="ts">
interface Tool {
  icon: string
  name: string
  description: string
}

interface Props {
  title: string
  subtitle: string
  headerIcon: string
  tools: Tool[]
}

defineProps<Props>()
</script>

<template>
  <div class="max-w-sm mx-auto group w-[22rem] lg:w-96">
    <div
      class="relative p-8 rounded-2xl border border-border bg-card dark:bg-primary-950/10 dark:border-primary-950/70 text-card-foreground transition-colors hover:border-primary-700 dark:hover:border-primary-900 cursor-default"
    >
      <!-- Header -->
      <div class="flex items-center gap-4 mb-6">
        <div
          class="w-12 h-12 rounded-xl bg-primary-200 dark:bg-primary-900/30 bg-opacity-80 dark:bg-opacity-50 flex items-center justify-center shadow-sm"
        >
          <Icon :name="headerIcon" class="w-6 h-6 text-primary-500 dark:text-primary-500" />
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ subtitle }}
          </p>
        </div>
      </div>

      <!-- Tools List -->
      <div class="space-y-2">
        <div v-for="tool in tools" :key="tool.name" class="flex items-center gap-3 p-3 rounded-lg">
          <Icon :name="tool.icon" class="w-5 h-5" />
          <div>
            <div class="font-medium text-gray-900 dark:text-white">
              {{ tool.name }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ tool.description }}
            </div>
          </div>
        </div>
      </div>

      <!-- Subtle Indicators -->
      <div
        class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div
          class="w-1 h-1 rounded-full bg-primary-500/40 dark:bg-primary-500/30 animate-[pulse_2s_ease-in-out_infinite]"
        />
        <div
          class="w-1 h-1 rounded-full bg-primary-500/40 dark:bg-primary-500/30 animate-[pulse_2s_ease-in-out_infinite_0.4s]"
        />
        <div
          class="w-1 h-1 rounded-full bg-primary-500/40 dark:bg-primary-500/30 animate-[pulse_2s_ease-in-out_infinite_0.8s]"
        />
      </div>
    </div>
  </div>
</template>
