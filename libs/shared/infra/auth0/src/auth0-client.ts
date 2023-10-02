import { initAuth0 } from '@auth0/nextjs-auth0'
import { getEnv } from '@codelab/shared/config'

/**
 * For Vercel preview, the URL provided as NEXT_PUBLIC_VERCEL_URL https://vercel.com/docs/concepts/projects/environment-variables doesn't have the correct format. It's missing `https`
 *
 * Cypress manages env differently
 */
export const auth0Instance = () => {
  return initAuth0({
    baseURL: getEnv().auth0.baseUrl,
    clientID: getEnv().auth0.clientId,
    clientSecret: getEnv().auth0.clientSecret,
    issuerBaseURL: getEnv().auth0.issuerBaseUrl,
    secret: getEnv().auth0.secret,
  })
}
