import { get } from 'env-var'

export interface Auth0Configuration {
  secret: string
  baseUrl: string
  issuer: string
  clientId: string
  clientSecret: string
  audience: string
}

export interface Configuration {
  auth0: Auth0Configuration
}

export const configuration = (): Configuration => ({
  auth0: {
    secret: get('AUTH0_SECRET').required(true).asString(),
    baseUrl: get('AUTH0_BASE_URL').required(true).asString(),
    issuer: get('AUTH0_ISSUER_BASE_URL').required(true).asString(),
    clientId: get('AUTH0_CLIENT_ID').required(true).asString(),
    clientSecret: get('AUTH0_CLIENT_SECRET').required(true).asString(),
    audience: get('AUTH0_AUDIENCE').required(true).asString(),
  },
})
