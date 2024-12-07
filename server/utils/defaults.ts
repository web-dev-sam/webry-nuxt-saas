export function createProfilePicture() {
  const profilePictureSeed = Math.floor(Math.random() * 16) + 1 // 1-16
  return `/img/profile-placeholder/thumbs-${profilePictureSeed}.png`
}

export const Time = {
  Second: 1000,
  Minute: 60 * 1000,
  Hour: 60 * 60 * 1000,
  Day: 24 * 60 * 60 * 1000,
} as const
