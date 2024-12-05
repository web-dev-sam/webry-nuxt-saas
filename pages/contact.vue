<script setup lang="ts">
interface ContactMethod {
  icon: string
  title: string
  description: string
  link?: string
  action?: string
}

const contactEmail = useRuntimeConfig().public.contactEmail
const contactMethods: ContactMethod[] = [
  {
    icon: "heroicons:chat-bubble-left-right",
    title: "Discord Community",
    description: "Join our community",
    link: "/discord",
    action: "Hey →",
  },
  {
    icon: "heroicons:document-text",
    title: "Documentation",
    description: "Read our existing documentation",
    link: "/docs",
    action: "Docs →",
  },
  {
    icon: "heroicons:envelope",
    title: "Email Support",
    description: "Send us an email",
    link: `mailto:${contactEmail}`,
    action: "Support →",
  },
]
</script>

<template>
  <div>
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Get in touch</h1>
        <p class="text-xl text-muted-foreground">Have questions? We're here to help you get started.</p>
      </div>

      <!-- Contact Methods -->
      <div class="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
        <div v-for="method in contactMethods" :key="method.title" class="p-6 rounded-xl text-center">
          <div class="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon :name="method.icon" class="w-6 h-6 text-primary-600" />
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ method.title }}</h3>
          <p class="text-muted-foreground mb-4">{{ method.description }}</p>
          <NuxtLink v-if="method.link" :to="method.link" class="text-primary-600 hover:text-primary-700 font-medium" :aria-label="method.action">
            {{ method.action }}
          </NuxtLink>
        </div>
      </div>

      <div class="max-w-2xl mx-auto">
        <!-- Contact Form
        <div class="rounded-xl p-8">
          <form @submit.prevent="handleSubmit">
            <div class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-muted-foreground mb-1"> Name </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-background outline-none"
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-muted-foreground mb-1"> Email </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-background outline-none"
                />
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-muted-foreground mb-1"> Subject </label>
                <input
                  id="subject"
                  v-model="formData.subject"
                  type="text"
                  required
                  class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-background outline-none"
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-muted-foreground mb-1"> Message </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="4"
                  required
                  class="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-background outline-none"
                />
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-lg text-primary-foreground bg-primary hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon v-if="isSubmitting" name="heroicons:arrow-path" class="animate-spin mr-2 w-5 h-5" />
                {{ isSubmitting ? "Sending..." : /*"Send Message?"*/ "Soon" }}
              </button>
            </div>
          </form>
        </div> -->

        <div class="mt-8 text-center text-muted-foreground">
          <p>Business Hours: Monday - Friday, 9AM - 5PM CET</p>
        </div>
      </div>
    </div>
  </div>
</template>
