import { initAuth0 } from '@auth0/nextjs-auth0'
import { getEnv } from '@codelab/shared/config'

/**
 * Cypress manages env differently
 */
export const auth0Instance = () => {
  console.log({
    authorizationParams: {
      audience: getEnv().auth0.audience,
    },
    baseURL: getEnv().auth0.baseUrl,
    clientID: getEnv().auth0.clientId,
    clientSecret: getEnv().auth0.clientSecret,
    issuerBaseURL: getEnv().auth0.issuerBaseUrl,
    secret: getEnv().auth0.secret,
  })

  return initAuth0({
    authorizationParams: {
      audience: getEnv().auth0.audience,
    },
    baseURL: getEnv().auth0.baseUrl,
    clientID: getEnv().auth0.clientId,
    clientSecret: getEnv().auth0.clientSecret,
    issuerBaseURL: getEnv().auth0.issuerBaseUrl,
    secret: getEnv().auth0.secret,
  })
}
