export function createProfilePicture() {
  const profilePictureSeed = Math.floor(Math.random() * 16) + 1 // 1-16
  return `/img/profile-placeholder/thumbs-${profilePictureSeed}.png`
}
