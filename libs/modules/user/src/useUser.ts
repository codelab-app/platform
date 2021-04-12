import { useUser } from '@auth0/nextjs-auth0'

export const useCurrentUser = () => {
  const { user } = useUser()

  const userId =
    user && user['https://hasura.io/jwt/claims']
      ? (user['https://hasura.io/jwt/claims'] as any)['x-hasura-user-id']
      : undefined

  return { user, userId }
}
