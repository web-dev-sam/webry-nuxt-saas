<script lang="ts" setup>
// const { data } = useAPI("/products")
defineOgImageComponent("NuxtSeo", {
  title: "Nuxt SaaS Template",
  description: "A modern SaaS template that helps you launch your product in days, not months.",
  theme: "#00DA7F",
  colorMode: "dark",
})

const componentsBaseStyle = `
  after:absolute overflow-visible after:bottom-[-1rem] after:left-1/2 after:transform after:translate-x-[-50%] after:pt-2 after:hidden group-hover:after:block
  after:transition-colors after:hover:cursor-none before:absolute before:bottom-[-2.2rem] before:text-xs before:left-1/2 before:transform before:translate-x-[-50%] 
  before:pt-2 before:hidden group-hover:before:block before:transition-colors before:hover:cursor-none before:text-gray-600`
</script>

<template>
  <div>
    <section class="transition-colors duration-200">
      <div class="container mx-auto px-4 pt-24 md:pt-32 pb-20">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Build amazing web apps faster than ever
          </h1>

          <p class="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
            A modern SaaS template that helps you launch your product in days, not months.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/login" class="group">
              <UiButton variant="primary" size="lg" class="bg-primary-500">
                Get Started
                <Icon name="ph:arrow-right" class="ml-2 group-hover:translate-x-1 transition-transform" size="18" />
              </UiButton>
            </NuxtLink>
          </div>

          <div class="mt-12 text-sm text-gray-500 dark:text-gray-400">
            <p class="mb-4">Developer excellence with</p>
            <div class="flex justify-center items-center gap-4 relative">
              <NuxtLink
                to="https://nuxt.com/"
                external
                no-prefetch
                target="_blank"
                class="dark:hover:text-[#00DB81] p-2 relative group"
                aria-label="Nuxt"
              >
                <div
                  :class="
                    cn(componentsBaseStyle, `after:content-['Nuxt'] before:content-['Framework'] after:text-[#00DB81] `)
                  "
                >
                  <Icon name="simple-icons:nuxtdotjs" size="24" />
                </div>
              </NuxtLink>
              <NuxtLink
                to="https://tailwindcss.com/"
                external
                no-prefetch
                target="_blank"
                class="dark:hover:text-[#0DA4E9] p-2 relative group"
                aria-label="Tailwind"
              >
                <div
                  :class="
                    cn(componentsBaseStyle, `after:content-['Tailwind'] before:content-['CSS'] after:text-[#0DA4E9]`)
                  "
                >
                  <Icon name="simple-icons:tailwindcss" size="24" />
                </div>
              </NuxtLink>
              <NuxtLink
                to="https://www.shadcn-vue.com/"
                external
                no-prefetch
                target="_blank"
                class="dark:hover:text-[#FFF] p-2 relative group"
                aria-label="Shadcn"
              >
                <div
                  :class="
                    cn(
                      componentsBaseStyle,
                      `after:content-['Shadcn'] before:content-['Components'] after:text-[#444] dark:after:text-[#FFF]`,
                    )
                  "
                >
                  <Icon name="simple-icons:shadcnui" size="20" class="my-[2px]" />
                </div>
              </NuxtLink>
              <NuxtLink
                to="https://orm.drizzle.team/"
                external
                no-prefetch
                target="_blank"
                class="dark:hover:text-[#C4F74F] p-2 relative group"
                aria-label="Drizzle ORM"
              >
                <div
                  :class="
                    cn(
                      componentsBaseStyle,
                      `after:content-['Drizzle'] before:content-['ORM'] after:text-[#86a745] dark:after:text-[#C4F74F]`,
                    )
                  "
                >
                  <Icon name="simple-icons:drizzle" size="24" />
                </div>
              </NuxtLink>
              <NuxtLink
                to="https://orm.drizzle.team/"
                external
                no-prefetch
                target="_blank"
                class="dark:hover:text-[#5F56F7] p-2 relative group"
                aria-label="Stripe"
              >
                <div
                  :class="
                    cn(componentsBaseStyle, `after:content-['Stripe'] before:content-['Payments'] after:text-[#5F56F7]`)
                  "
                >
                  <Icon name="simple-icons:stripe" size="18" class="my-[3px]" />
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--
    TODO: Unuglify and use in features page
    <section class="container mx-auto px-4 py-24 mb-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          All the features you need
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
          Powered by the latest technologies with excellent developer and user experience.
        </p>
      </div>
      <div
        class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto auto-rows-fr place-items-center justify-evenly content-evenly"
      >
        <FeatureCard
          title="Modern Tools"
          subtitle="Production-ready stack"
          header-icon="heroicons:wrench-screwdriver"
          :tools="[
            {
              icon: 'tabler:brand-nuxt',
              name: 'Nuxt 3',
              description: 'Vue-powered SSR framework',
            },
            {
              icon: 'tabler:brand-tailwind',
              name: 'Tailwind CSS',
              description: 'Utility-first CSS framework',
            },
            {
              icon: 'tabler:brand-typescript',
              name: 'TypeScript',
              description: 'Type-safe development',
            },
          ]"
        />
        <FeatureCard
          title="SEO Optimized"
          subtitle="Better search visibility"
          header-icon="heroicons:magnifying-glass"
          :tools="[
            {
              icon: 'heroicons:document-text',
              name: 'Robots.txt',
              description: 'Search engine crawl control',
            },
            {
              icon: 'heroicons:map',
              name: 'XML Sitemaps',
              description: 'Automated site mapping',
            },
            {
              icon: 'heroicons:code-bracket-square',
              name: 'Schema.org',
              description: 'Structured data markup',
            },
          ]"
        />
        <FeatureCard
          title="Enterprise Security"
          subtitle="Built-in protection"
          header-icon="heroicons:shield-check"
          :tools="[
            {
              icon: 'heroicons:lock-closed',
              name: 'CSP Headers',
              description: 'Strict Content Security Policy',
            },
            {
              icon: 'heroicons:shield-exclamation',
              name: 'CSRF Protection',
              description: 'Cross-site request forgery prevention',
            },
            {
              icon: 'heroicons:clock',
              name: 'Rate Limiting',
              description: 'Request throttling',
            },
          ]"
        />
        <FeatureCard
          title="Performance First"
          subtitle="Lightning fast apps"
          header-icon="heroicons:bolt"
          :tools="[
            {
              icon: 'heroicons:server',
              name: 'SSR',
              description: 'Render on the server',
            },
            {
              icon: 'heroicons:arrow-path',
              name: 'Link Prefetching',
              description: 'Automatic route prefetching',
            },
            {
              icon: 'heroicons:photo',
              name: 'Image Optimization',
              description: 'Automatic image optimization',
            },
          ]"
        />
        <FeatureCard
          title="Developer Experience"
          subtitle="Joy of development"
          header-icon="heroicons:code-bracket"
          :tools="[
            {
              icon: 'heroicons:sparkles',
              name: '200,000+ Icons',
              description: 'Comprehensive icon library',
            },
            {
              icon: 'heroicons:bug-ant',
              name: 'Error Handling',
              description: 'Rust result-based error handling',
            },
            {
              icon: 'heroicons:command-line',
              name: 'Developer Tools',
              description: 'Enhanced logging and tooling',
            },
          ]"
        />
        <div class="max-w-sm mx-auto group w-[22rem]">
          <div class="px-8 py-12 rounded-xl flex flex-col items-center justify-center text-center transition-colors">
            <Icon
              name="heroicons:plus-circle"
              class="w-12 h-12 text-primary-600 dark:text-primary-700 mb-4 transition-colors"
            />

            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">And Much More</h3>

            <p class="text-gray-600 dark:text-gray-300 mb-4 transition-colors">
              Discover all the features that make this template amazing
            </p>

            <UiButton
              to="/features"
              variant="outline-filled-default"
              size="lg"
              class="text-primary-700 hover:bg-primary-700 dark:hover:bg-primary-950 dark:hover:bg-opacity-30"
            >
              <NuxtLink to="/features"> All Features </NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </section> -->
  </div>
</template>
