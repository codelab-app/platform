import { initAuth0 } from '@auth0/nextjs-auth0'
import { Config } from '@codelab/shared/config'
import { isVercel, isVercelPreview } from '@codelab/shared/env'

console.log('isVercel', isVercel)
console.log('isVercelPreview', isVercelPreview)
console.log('baseUrl', Config().auth0.baseUrl)

/**
 * For Vercel preview, the URL provided as NEXT_PUBLIC_VERCEL_URL https://vercel.com/docs/concepts/projects/environment-variables doesn't have the correct format. It's missing `https`
 */
export const auth0Instance = initAuth0({
  baseURL: Config().auth0.baseUrl,
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
