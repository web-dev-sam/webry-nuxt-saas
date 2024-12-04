<script setup lang="ts">
interface PricingFeature {
  name: string
  included: boolean
}

interface PricingTier {
  name: string
  price: number
  description: string
  features: PricingFeature[]
  recommended?: boolean
  license: string
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: 0,
    description: "Perfect for side projects and small applications",
    license: "Single project license",
    features: [
      { name: "Full source code access", included: true },
      { name: "Authentication system", included: true },
      { name: "Standard functionality", included: true },
      { name: "Many projects", included: true },
      { name: "Future updates", included: false },
      { name: "Support", included: false },
      { name: "Community support", included: false },
      { name: "Be cooler", included: false },
    ],
  },
  {
    name: "Pro",
    price: 0,
    description: "Best for professional developers and teams",
    license: "Unlimited projects license",
    recommended: true,
    features: [
      { name: "Full source code access", included: true },
      { name: "Authentication system", included: true },
      { name: "Standard functionality", included: true },
      { name: "Many projects", included: true },
      { name: "Past updates", included: true },
      { name: "No support", included: true },
      { name: "Eternal happiness", included: true },
      { name: "Be cooler", included: true },
    ],
  },
]
</script>

<template>
  <div>
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Simple, transparent pricing</h1>
        <p class="text-xl text-muted-foreground">One-time payment, lifetime access. No hidden fees or subscriptions.</p>
      </div>

      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div
          v-for="tier in pricingTiers"
          :key="tier.name"
          class="relative rounded-2xl border border-gray-500"
          :class="[tier.recommended ? 'border-primary shadow-lg' : '']"
        >
          <div
            v-if="tier.recommended"
            class="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-primary px-3 py-2 text-sm font-medium text-center text-primary-foreground"
          >
            Recommended
          </div>

          <div class="p-8">
            <div class="mb-8">
              <h2 class="text-2xl font-bold">{{ tier.name }}</h2>
              <p class="mt-2 text-muted-foreground">{{ tier.description }}</p>
              <p class="mt-6">
                <span class="text-4xl font-bold">${{ tier.price }}</span>
                <span class="text-muted-foreground ml-2">one-time</span>
              </p>
              <p class="mt-2 text-sm text-muted-foreground">{{ tier.license }}</p>
            </div>

            <ul class="space-y-4 mb-8">
              <li
                v-for="feature in tier.features"
                :key="feature.name"
                class="flex items-center gap-3"
                :class="feature.included ? '' : 'text-gray-400'"
              >
                <Icon
                  :name="feature.included ? 'heroicons:check-circle' : 'heroicons:x-circle'"
                  class="w-5 h-5"
                  :class="feature.included ? 'text-primary' : ''"
                />
                {{ feature.name }}
              </li>
            </ul>

            <NuxtLink
              :to="`/checkout/${tier.name.toLowerCase()}`"
              class="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg text-base font-semibold transition-colors"
              :class="[
                tier.recommended
                  ? 'bg-primary text-primary-foreground hover:bg-primary-600'
                  : 'border border-gray-600 hover:border-gray-500',
              ]"
            >
              Get Started
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="max-w-3xl mx-auto mt-20">
        <h2 class="text-3xl font-bold text-center mb-12">Frequently asked questions</h2>
        <div class="space-y-8">
          <div>
            <h3 class="text-lg font-semibold mb-2">What's included in the source code?</h3>
            <p class="text-muted-foreground">
              You'll get the complete source code, including all components, pages, and functionality shown in this
              demo. Everything is fully customizable and not well-documented.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Can I use this for client projects?</h3>
            <p class="text-muted-foreground">
              The Pro license allows you to use the template for unlimited personal and client projects. The Starter
              license is limited to a single project.
            </p>
          </div>
          <div>
            <h3 class="text-lg font-semibold mb-2">Do you offer refunds?</h3>
            <p class="text-muted-foreground">
              Yes, we offer a 14-day money-back guarantee. If you're not satisfied with the template, we'll provide a
              full refund.
            </p>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <div class="flex items-center justify-center gap-2 text-muted-foreground">
          <Icon name="heroicons:shield-check" class="w-5 h-5 text-primary" />
          <span>14-day money-back guarantee</span>
        </div>
      </div>
    </div>
  </div>
</template>
