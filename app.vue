<script setup lang="ts">
useSeoMeta({
  // Basic SEO
  title: "SaaS Name",
  description: "Your compelling description here - make it unique and descriptive",
  robots: "index, follow",
  author: "Webry",

  // // Open Graph / Social Media
  // ogTitle: "SaaS Name",
  // ogType: "website",
  // ogUrl: "https://saas.webry.com",
  // ogDescription: "Your compelling description here - make it unique and descriptive",
  // ogImage: "https://saas.webry.com/logo.svg", // Already/Should-be handled by og image module
  // ogLocale: "en_US",
  // ogSiteName: "SaaS Name",

  // // Twitter Cards
  // twitterCard: "summary_large_image",
  // twitterTitle: "SaaS Name",
  // twitterDescription: "Your compelling description here - make it unique and descriptive",
  // twitterImage: "https://saas.webry.com/logo.svg", // Already/Should-be handled by og image module
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <UiToastToaster />
  </NuxtLayout>
</template>
