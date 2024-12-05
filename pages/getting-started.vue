<script setup lang="ts">
definePageMeta({
  layout: "internal",
  middleware: "auth",
})

interface SetupStep {
  title: string
  description: string
  code?: string
  important?: boolean
  todos?: string[]
}

const setupSteps: SetupStep[] = [
  {
    title: "Clone the Repository",
    description: "Start by cloning the repository to your local machine.",
    code: "git clone https://github.com/yourusername/nuxt-saas-template.git\ncd nuxt-saas-template",
  },
  {
    title: "Install Dependencies",
    description: "Install all required dependencies using your preferred package manager.",
    code: "pnpm install\n# or\nnpm install\n# or\nyarn install",
  },
  {
    title: "Environment Setup",
    description: "Create your environment file and add your configuration values.",
    code: "cp .env.example .env",
    important: true,
    todos: [
      "DATABASE_URL=postgresql://...",
      "STRIPE_SECRET_KEY=sk_test_...",
      "STRIPE_PUBLISHABLE_KEY=pk_test_...",
      "SMTP_FROM=support@yourdomain.com",
      "SMTP_HOST=smtp.provider.com",
    ],
  },
  {
    title: "Database Setup",
    description: "Initialize your database and run migrations.",
    code: "pnpm prisma generate\npnpm prisma db push",
  },
  {
    title: "Development Server",
    description: "Start the development server and begin coding.",
    code: "pnpm dev",
  },
]

const requiredAccounts = [
  {
    name: "Stripe",
    description: "Payment processing",
    url: "https://dashboard.stripe.com/register",
  },
  {
    name: "PostgreSQL Database",
    description: "Data storage (we recommend Railway or Supabase)",
    url: "https://railway.app",
  },
  {
    name: "SMTP Provider",
    description: "Email sending (Resend, Postmark, or similar)",
    url: "https://resend.com",
  },
]
</script>

<template>
  <div class="">
    <div class="container mx-auto px-4 py-20">
      <div class="max-w-3xl mx-auto text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">Getting Started Guide</h1>
        <p class="text-xl text-muted-foreground">Follow these steps to set up your project in minutes.</p>
      </div>

      <div class="max-w-3xl mx-auto mb-16">
        <div class="border rounded-xl p-6">
          <h2 class="text-lg font-semibold mb-4">Required Accounts</h2>
          <p class="text-muted-foreground mb-6">Before you begin, make sure you have accounts with these services:</p>
          <div class="space-y-4">
            <div v-for="account in requiredAccounts" :key="account.name" class="flex items-start gap-4">
              <div class="w-6 h-6 mt-1">
                <Icon name="heroicons:arrow-right-circle" class="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h3 class="font-medium">{{ account.name }}</h3>
                <p class="text-muted-foreground text-sm">{{ account.description }}</p>
                <a
                  :href="account.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-primary-700 text-sm font-medium inline-flex items-center gap-1 mt-1"
                >
                  Sign up
                  <Icon name="heroicons:arrow-top-right-on-square-mini" class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Setup Steps -->
      <div class="max-w-3xl mx-auto">
        <div class="space-y-12">
          <div v-for="(step, index) in setupSteps" :key="step.title" class="relative">
            <!-- Step Number -->
            <div class="absolute -left-12 top-0 hidden md:block">
              <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold">
                {{ index + 1 }}
              </div>
            </div>

            <!-- Step Content -->
            <div>
              <h2 class="text-xl font-bold mb-4">{{ step.title }}</h2>
              <p class="text-gray-600 mb-4">{{ step.description }}</p>

              <div v-if="step.code" class="bg-gray-900 rounded-lg p-4 font-mono text-sm mb-4">
                <pre><code>{{ step.code }}</code></pre>
              </div>

              <div
                v-if="step.important"
                class="bg-primary-50 border border-primary-200 rounded-lg p-4 text-primary-800"
              >
                <div class="flex items-center gap-2">
                  <Icon name="heroicons:exclamation-circle" class="w-5 h-5" />
                  <span class="font-medium">Important:</span>
                </div>
                <p class="mt-1">Never commit your .env file to version control. Keep your secrets safe!</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div class="mt-16 p-6 rounded-xl">
          <h2 class="text-xl font-bold mb-4">Next Steps</h2>
          <ul class="space-y-3 text-muted-foreground">
            <li class="flex items-center gap-2">
              <Icon name="heroicons:document-text" class="w-5 h-5 text-gray-400" />
              Read the full documentation
            </li>
            <li class="flex items-center gap-2">
              <Icon name="heroicons:code-bracket" class="w-5 h-5 text-gray-400" />
              Customize the template to match your brand
            </li>

            <!-- Continuing from the previous template -->
            <li class="flex items-center gap-2">
              <Icon name="heroicons:chat-bubble-left-right" class="w-5 h-5 text-gray-400" />
              Join our Discord community for support
            </li>
            <li class="flex items-center gap-2">
              <Icon name="heroicons:star" class="w-5 h-5 text-gray-400" />
              Star our repository on GitHub
            </li>
          </ul>
        </div>

        <div class="mt-16">
          <h2 class="text-2xl font-bold mb-6">Common Issues</h2>
          <div class="space-y-6">
            <div class="rounded-lg border p-6">
              <h3 class="font-semibold mb-2">Database Connection Issues</h3>
              <p class="text-gray-600 mb-4">If you're having trouble connecting to your database, ensure:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Your DATABASE_URL is correctly formatted</li>
                <li>The database server is running</li>
                <li>Your IP is whitelisted in the database firewall settings</li>
              </ul>
            </div>

            <div class="rounded-lg border p-6">
              <h3 class="font-semibold mb-2">Stripe Integration</h3>
              <p class="text-gray-600 mb-4">For Stripe-related issues:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Verify you're using the correct API keys (test/live)</li>
                <li>Ensure webhook endpoints are properly configured</li>
                <li>Check Stripe CLI logs for detailed error messages</li>
              </ul>
            </div>

            <div class="rounded-lg border p-6">
              <h3 class="font-semibold mb-2">Email Configuration</h3>
              <p class="text-gray-600 mb-4">If emails aren't being sent:</p>
              <ul class="list-disc list-inside space-y-2 text-gray-600 ml-4">
                <li>Verify SMTP credentials are correct</li>
                <li>Check spam folders during testing</li>
                <li>Ensure email templates are properly configured</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="mt-16">
          <h2 class="text-2xl font-bold mb-6">Useful Commands</h2>
          <div class="bg-gray-900 rounded-lg p-6 font-mono text-sm">
            <div class="space-y-4">
              <div>
                <p class="text-gray-400 mb-2"># Development server</p>
                <code>pnpm dev</code>
              </div>
              <div>
                <p class="text-gray-400 mb-2"># Run tests</p>
                <code>pnpm test</code>
              </div>
              <div>
                <p class="text-gray-400 mb-2"># Build for production</p>
                <code>pnpm build</code>
              </div>
              <div>
                <p class="text-gray-400 mb-2"># Lint and fix files</p>
                <code>pnpm lint</code>
              </div>
              <div>
                <p class="text-gray-400 mb-2"># Update database schema</p>
                <code>pnpm prisma db push</code>
              </div>
            </div>
          </div>
        </div>

        <!-- Support Links -->
        <div class="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/docs"
            class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            aria-label="Read Documentation"
          >
            <Icon name="heroicons:book-open" class="w-5 h-5 mr-2" />
            Read Documentation
          </NuxtLink>

          <a
            href="https://github.com/yourusername/nuxt-saas-template/issues"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Icon name="heroicons:bug-ant" class="w-5 h-5 mr-2" />
            Report an Issue
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
