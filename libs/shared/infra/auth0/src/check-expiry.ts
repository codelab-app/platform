import type { Session } from '@auth0/nextjs-auth0'

export const checkExpiry = (session: Session | null | undefined): boolean => {
  if (!session) {
    return true
  }

  const currentTime = new Date()
  const accessTokenExpiresAt = session['accessTokenExpiresAt']

  if (!accessTokenExpiresAt) {
    return true
  }

  const sessionExpiryTime = new Date(accessTokenExpiresAt * 1000)

  // return true
  return currentTime.getTime() > sessionExpiryTime.getTime()
}
