export default defineNuxtPlugin(() => {
  const $apiFetch = $fetch.create({
    baseURL: "https://dummyjson.com/",
  })

  return {
    provide: {
      apiFetch: $apiFetch,
    },
  }
})
