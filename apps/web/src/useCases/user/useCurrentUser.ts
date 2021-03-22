import { useUser } from '@auth0/nextjs-auth0'

/**
 * Deprecated, use {@see useUser} directly
 * @deprecated
 */
export const useCurrentUser = () => {
  const { user } = useUser()

  return { user }
}
