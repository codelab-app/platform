import { initAuth0 } from '@auth0/nextjs-auth0'
import type { BaseConfig } from '@auth0/nextjs-auth0/dist/config'
import { getEnv } from '@codelab/shared/config'

/**
 * For Vercel preview, the URL provided as NEXT_PUBLIC_VERCEL_URL https://vercel.com/docs/concepts/projects/environment-variables doesn't have the correct format. It's missing `https`
 *
 * Cypress manages env differently
 */
export const auth0Instance = (baseConfig: Partial<BaseConfig> = {}) => {
  console.debug('Creating auth0Instance...')

  const { baseURL, clientID, clientSecret, issuerBaseURL, secret } = baseConfig

  return initAuth0({
    baseURL: baseURL ?? getEnv().auth0.baseUrl,
    clientID: clientID ?? getEnv().auth0.clientId,
    clientSecret: clientSecret ?? getEnv().auth0.clientSecret,
    issuerBaseURL: issuerBaseURL ?? getEnv().auth0.issuerBaseUrl,
    secret: secret ?? getEnv().auth0.secret,
  })
}

// /**
//  * Help extract JWT access token from SSR session and set authorization header on our client
//  *
//  * @param context GetServerSidePropsContext
//  */
// export const setClientAuthHeaders = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const session = await auth0Instance().getSession(context.req, context.res)
//
//   client.setHeaders({
//     authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
//   })
//
//   return session
// }
