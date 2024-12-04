<script setup lang="ts">
import { isVNode } from "vue"
import { useToast } from "../../../composables/useToast"

const { toasts } = useToast()
const transformedToasts = computed(() => {
  return toasts.value.map((toast) => {
    if (!toast.description || typeof toast.description !== "string") {
      return toast
    }

    return {
      ...toast,
      description: toast.description.split("\n").map((line, index, array) => {
        const vNode = h("span", {}, [line, index < array.length - 1 ? h("br") : null])
        return vNode
      }),
    }
  })
})
</script>

<template>
  <UiToastProvider>
    <UiToast v-for="toast in transformedToasts" :key="toast.id" v-bind="toast">
      <div class="grid gap-1">
        <UiToastTitle v-if="toast.title">
          {{ toast.title }}
        </UiToastTitle>
        <template v-if="toast.description">
          <UiToastDescription v-if="isVNode(toast.description)">
            <component :is="toast.description" />
          </UiToastDescription>
          <UiToastDescription v-else>
            <template v-for="(line, index) in toast.description" :key="index">
              <component :is="line" />
            </template>
          </UiToastDescription>
        </template>
        <UiToastClose />
      </div>
      <component :is="toast.action" />
    </UiToast>
    <UiToastViewport />
  </UiToastProvider>
</template>
