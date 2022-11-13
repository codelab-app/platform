import { initAuth0 } from '@auth0/nextjs-auth0'
import { Env } from '@codelab/shared/env'

/**
 * For Vercel preview, the URL provided as NEXT_PUBLIC_VERCEL_URL https://vercel.com/docs/concepts/projects/environment-variables doesn't have the correct format. It's missing `https`
 */
export const auth0Instance = initAuth0({
  secret: Env().auth0.secret,
  baseURL: Env().auth0.base_url,
  clientID: Env().auth0.client_id,
  clientSecret: Env().auth0.client_secret,
  issuerBaseURL: Env().auth0.issuer_base_url,
})

// /**
//  * Help extract JWT access token from SSR session and set authorization header on our client
//  *
//  * @param context GetServerSidePropsContext
//  */
// export const setClientAuthHeaders = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const session = await auth0Instance.getSession(context.req, context.res)
//
//   client.setHeaders({
//     authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
//   })
//
//   return session
// }
