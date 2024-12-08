<script setup lang="ts">
const { loggedIn } = useUserSession()
if (loggedIn.value) {
  void navigateTo("/dashboard")
}

const router = useRouter()
const route = useRoute()
if (import.meta.client && "redirect" in route.query && typeof route.query.redirect === "string") {
  localStorage.setItem("redirectTo", route.query.redirect)
  router.replace({ query: {} })
}
</script>

<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-4 pt-16 md:pt-32 pb-20">
      <div class="max-w-md mx-auto p-8">
        <div class="text-center mb-8">
          <CommonLogo class="h-32 mx-auto mt-8 mb-8" />
          <h1 class="text-2xl mb-2">Welcome to SaaS Template</h1>
          <p class="dark:text-muted-foreground">Sign in to your account</p>
        </div>

        <div class="space-y-4 mb-6">
          <NuxtLink to="/api/auth/google" external class="w-full border rounded-lg hover:translate-x-1 transition-all" aria-label="Sign in with Google" as-child>
            <UiButton
              variant="secondary"
              class="inline-flex items-center justify-center gap-3 px-4 py-6 w-full text-sm"
              tabindex="-1"
            >
              <Icon name="logos:google-icon" size="20px" />
              <span class="font-medium">Continue with Google</span>
            </UiButton>
          </NuxtLink>
          <NuxtLink
            to="/api/auth/github"
            external
            class="w-full border rounded-lg hover:translate-x-1 transition-all"
            aria-label="Sign in with GitHub"
            as-child
          >
            <UiButton
              variant="secondary"
              class="inline-flex items-center justify-center gap-3 px-4 py-6 w-full text-sm"
              tabindex="-1"
            >
              <Icon name="simple-icons:github" size="20px" class="text-[#161415] dark:text-white" />
              <span class="font-medium">Continue with GitHub</span>
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
