<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { z } from "zod"
import { useVModel } from "@vueuse/core"

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes["class"]
  schema?: z.ZodType<string | number | undefined>
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const invalidInput = ref(false)

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

watch(modelValue, (value) => {
  if (props.schema) {
    const result = props.schema.safeParse(value)
    invalidInput.value = !result.success
  }
})
</script>

<template>
  <input
    v-model="modelValue"
    :class="
      cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        { 'ring-destructive': invalidInput },
        props.class,
      )
    "
  />
</template>
