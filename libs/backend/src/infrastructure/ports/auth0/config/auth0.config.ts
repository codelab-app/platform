import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { Auth0Tokens } from './auth0.tokens'

export interface Auth0Config {
  secret: string
  baseUrl: string
  issuer: string
  clientId: string
  clientSecret: string
  api: {
    audience: string
    clientId: string
    clientSecret: string
    accessToken?: string
  }
  // Cypress
  cypressUsername: string
  cypressPassword: string
}

export const auth0Config = registerAs<() => Auth0Config>(
  Auth0Tokens.Auth0Config.toString(),
  () => ({
    secret: get('AUTH0_SECRET').required().asString(),
    baseUrl: get('AUTH0_BASE_URL').required().asString(),
    issuer: get('AUTH0_ISSUER_BASE_URL').required().asUrlString(),
    clientId: get('AUTH0_CLIENT_ID').required().asString(),
    clientSecret: get('AUTH0_CLIENT_SECRET').required().asString(),
    api: {
      audience: get('AUTH0_AUDIENCE').required().asString(),
      clientId: get('AUTH0_API_CLIENT_ID').required().asString(),
      clientSecret: get('AUTH0_API_CLIENT_SECRET').required().asString(),
      // accessToken: get('AUTH0_M2M_TOKEN').required().asString(),
      accessToken: get('AUTH0_M2M_TOKEN').asString(),
    },
    cypressUsername: get('CYPRESS_AUTH0_USER').required().asString(),
    cypressPassword: get('CYPRESS_AUTH0_PASSWORD').required().asString(),
  }),
)
