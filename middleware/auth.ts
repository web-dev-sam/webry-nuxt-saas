export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) {
    const redirect = to.fullPath ? `?redirect=${encodeURIComponent(to.path)}` : ""
    return navigateTo(`/login${redirect}`, {
      external: true,
    })
  }
})
