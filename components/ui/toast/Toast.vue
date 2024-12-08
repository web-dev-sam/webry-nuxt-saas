<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority"
import { ToastRoot, type ToastRootEmits, type ToastRootProps, useForwardPropsEmits } from "radix-vue"
import { computed, type HTMLAttributes } from "vue"

const props = defineProps<ToastProps>()
const emits = defineEmits<ToastRootEmits>()

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[--radix-toast-swipe-end-x] data-[swipe=move]:translate-x-[--radix-toast-swipe-move-x] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        success: "success group border-green-500 bg-green-500 text-green-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

type ToastVariants = VariantProps<typeof toastVariants>

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes["class"]
  variant?: ToastVariants["variant"]
  onOpenChange?: ((value: boolean) => void) | undefined
}

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ToastRoot v-bind="forwarded" :class="cn(toastVariants({ variant }), props.class)" @update:open="onOpenChange">
    <slot />
  </ToastRoot>
</template>
