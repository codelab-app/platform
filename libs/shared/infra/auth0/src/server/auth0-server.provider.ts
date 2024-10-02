import { initAuth0 } from '@auth0/nextjs-auth0/edge'
import { getEnv } from '@codelab/shared/config'
import 'server-only'

/**
 * This is a different instance which uses edge runtime
 */
export const auth0ServerInstance = initAuth0({
  authorizationParams: {
    audience: getEnv().auth0.audience,
  },
  baseURL: getEnv().auth0.baseUrl,
  clientID: getEnv().auth0.clientId,
  clientSecret: getEnv().auth0.clientSecret,
  issuerBaseURL: getEnv().auth0.issuerBaseUrl,
  secret: getEnv().auth0.secret,
  session: {
    // https://stackoverflow.com/questions/76813923/how-to-avoid-warning-message-when-getting-user-information-on-next-js-13-server/77015385#77015385
    autoSave: false,
  },
})
