<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  description: string
  features: string[]
  planned: string[]
  notplanned: string[]
}

interface Technology {
  icon: string
  name: string
}

const features: Feature[] = [
  {
    title: "Data",
    icon: "ph:database",
    description: "Database management with CRUD operations and data validation",
    features: ["Postgres DB", "Drizzle ORM", "Zod validation", "User Accounts"],
    planned: ["Database migrations"],
    notplanned: ["Database seeding"],
  },
  {
    title: "Security",
    icon: "ph:shield-check",
    description: "Security-first approach with CSRF protection and CSP headers",
    features: [
      "CSRF protection",
      "Strict CSP headers",
      "CSP Nonce",
      "XSS Protection",
      "Rate limiting",
      "Auto noopener noreferrer",
    ],
    planned: [],
    notplanned: [],
  },
  {
    title: "Performance",
    icon: "ph:chart-bar",
    description: "Optimized for performance with server-side rendering and caching",
    features: ["SSR", "Cache Headers", "Image optimization", "Link prefetching"],
    planned: ["CDN support", "Image lazy loading"],
    notplanned: [],
  },
  {
    title: "Auth",
    icon: "ph:key",
    description: "Complete authentication system with social logins and accounts management",
    features: ["Social logins", "Account deletion", "Connecting multiple socials"],
    planned: ["Account recovery"],
    notplanned: ["Email/password login"],
  },
  {
    title: "SEO",
    icon: "ph:magnifying-glass",
    description: "Optimized for search engines with meta tags and structured data",
    features: ["Meta tags", "Sitemap generation", "Robots.txt", "Generates OG metadata", "Canonical Redirects"],
    planned: ["Structured data"],
    notplanned: [],
  },
  {
    title: "Dev Happiness",
    icon: "ph:code",
    description: "Trusting the process with TypeScript, linting, and logging",
    features: [
      "TypeScript",
      "Logging",
      "Linting & Formatting",
      "Result-based errors",
      "200.000+ icons",
      "GDPR compliant fonts",
      "VSCode extensions",
      "Precommit hooks",
    ],
    planned: ["Dark/Light mode", "Unified design"],
    notplanned: [],
  },
  {
    title: "Planned",
    icon: "ph:credit-card",
    description: "Built-in subscription management and payment processing with Stripe",
    features: [],
    planned: ["Stripe Integration", "Email System", "Settings Pages"],
    notplanned: ["Analytics"],
  },
]

const technologies: Technology[] = [
  { icon: "simple-icons:nuxtdotjs", name: "Nuxt 3" },
  { icon: "simple-icons:typescript", name: "TypeScript" },
  { icon: "simple-icons:tailwindcss", name: "Tailwind CSS" },
  { icon: "simple-icons:shadcnui", name: "Shadcn" },
  { icon: "simple-icons:drizzle", name: "Drizzle" },
  { icon: "simple-icons:resend", name: "Resend" },
  { icon: "simple-icons:stripe", name: "Stripe" },
  { icon: "simple-icons:eslint", name: "ESLint" },
]
</script>

<template>
  <div>
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Everything you need to build faster</h1>
        <p class="text-xl text-muted-foreground">
          A complete solution packed with all the features you need to launch your SaaS product quickly and efficiently.
        </p>
      </div>

      <div class="my-24 max-w-4xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="tech in technologies" :key="tech.name" class="text-center">
            <Icon :name="tech.icon" class="w-12 h-12 mx-auto mb-3" />
            <p class="font-medium">{{ tech.name }}</p>
          </div>
        </div>
      </div>

      <section
        v-for="(feature, i) of features"
        :key="feature.icon"
        class="relative gap-4 items-center my-32 text-center"
      >
        <div
          v-if="i % 2 === 0"
          class="w-[300px] h-[300px] absolute bg-[#5F56F7] -z-10 -left-32 -top-32 blur-[100px] opacity-10"
        ></div>
        <div
          v-else
          class="w-[300px] h-[300px] absolute bg-[#5F56F7] -z-10 -right-32 -top-32 blur-[100px] opacity-10"
        ></div>
        <Icon
          v-if="i % 2 === 0"
          :name="feature.icon"
          class="absolute text-background/20 -z-10 -left-0 -top-8"
          size="300"
        />
        <Icon v-else :name="feature.icon" class="absolute text-background/20 -z-10 -right-32 -top-16" size="300" />
        <div>
          <h3 class="text-5xl mb-3">{{ feature.title }}</h3>
          <p class="text-lg text-muted-foreground">{{ feature.description }}</p>
          <div class="flex flex-col md:flex-row items-center md:justify-evenly mt-12 gap-2">
            <ul v-if="feature.features.length" class="space-y-2 w-60">
              <li v-for="item in feature.features" :key="item" class="flex items-center gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary" />
                <span>{{ item }}</span>
              </li>
            </ul>
            <ul v-if="feature.planned.length + feature.notplanned.length" class="space-y-2 w-60">
              <li v-for="todo in feature.planned" :key="todo" class="flex items-center gap-2" data-tooltip="Planned...">
                <Icon name="heroicons:paper-airplane" class="w-5 h-5 -rotate-45 text-blue-400" />
                <span>{{ todo }}</span>
              </li>
              <li
                v-for="not in feature.notplanned"
                :key="not"
                class="flex items-center gap-2 text-muted-foreground"
                data-tooltip="Not planned!"
              >
                <Icon name="heroicons:x-circle" class="w-5 h-5 text-red-400" />
                <span>{{ not }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
[data-tooltip] {
  position: relative;
}

[data-tooltip]:before {
  content: attr(data-tooltip);
  position: absolute;
  height: 1rem;
  left: 0%;
  top: 50%;
  padding: 0;
  padding-right: 0.5rem;
  transform: translateX(-115%) translateY(-50%);
  border-radius: 4px;
  font-size: 0.8rem;
  text-align: center;
  white-space: nowrap;
  opacity: 0;
  background-color: transparent;
  visibility: hidden;
}

[data-tooltip]:hover:before {
  opacity: 1;
  visibility: visible;
}
</style>
