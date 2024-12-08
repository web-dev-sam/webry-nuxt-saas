<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cva, type VariantProps } from "class-variance-authority"
import { Primitive, type PrimitiveProps } from "radix-vue"

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})

// TODO: Fix variants for dark mode
const buttonVariants = cva(
  "inline-flex items-center font-500 px-4 py-2 border border-transparent text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-800 focus:ring-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 dark:focus-visible:ring-gray-800 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        "default": "bg-primary text-primary-foreground hover:bg-primary/90",
        "outline-default": "border-primary/60 bg-background hover:bg-accent hover:border-primary hover:bg-gray-50",
        "outline-filled-default":
          "border-primary/60 bg-background hover:bg-primary hover:border-primary hover:text-white",

        "destructive": "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        "outline-destructive":
          "bg-transparent border-destructive/60 text-destructive/90 hover:bg-red-50 hover:border-destructive hover:text-destructive",
        "outline-filled-destructive":
          "bg-transparent border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground",

        "secondary": "bg-secondary text-secondary-foreground hover:bg-secondary",
        "outline-secondary": "border-gray-300 text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-400",
        "outline-filled-secondary": "border-gray-500 text-gray-800 bg-white hover:bg-gray-500 hover:text-white",

        "neutral": "bg-neutral border-gray-300 text-gray-300 hover:border-gray-300 hover:text-gray-300",
        "primary": "bg-primary text-primary-foreground hover:bg-primary-600",

        "ghost": "text-muted-foreground hover:text-white",
        "outline-ghost": "border-gray-100 hover:border-gray-200 hover:bg-gray-50",
        "outline-filled-ghost": "",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </Primitive>
</template>
