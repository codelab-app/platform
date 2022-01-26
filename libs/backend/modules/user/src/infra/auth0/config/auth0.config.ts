import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { Auth0Tokens } from './auth0.tokens'

type UsernamePassword = {
  username: string
  password: string
}

export interface Auth0Config {
  baseUrl: string
  issuer: string
  clientId: string
  clientSecret: string
  audience: string
  api: {
    clientId?: string
    clientSecret?: string
  }
  cypress: UsernamePassword
}

export const auth0Config = registerAs<Auth0Config>(
  Auth0Tokens.Auth0Config.toString(),
  () => ({
    // Not used on backend
    // secret: get('AUTH0_SECRET').required().asString(),
    baseUrl: get('AUTH0_BASE_URL').required().asString(),
    issuer: get('AUTH0_ISSUER_BASE_URL').required().asUrlString(),
    clientId: get('AUTH0_CLIENT_ID').required().asString(),
    clientSecret: get('AUTH0_CLIENT_SECRET').required().asString(),
    audience: get('AUTH0_AUDIENCE').required().asString(),
    api: {
      clientId: get('AUTH0_API_CLIENT_ID').asString(),
      clientSecret: get('AUTH0_API_CLIENT_SECRET').asString(),
    },
    cypress: {
      username: get('AUTH0_CYPRESS_USERNAME').required().asString(),
      password: get('AUTH0_CYPRESS_PASSWORD').required().asString(),
    },
  }),
)
