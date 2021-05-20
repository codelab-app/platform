import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { AuthTokens } from './auth.tokens'

export interface Auth0Configuration {
  secret: string
  baseUrl: string
  issuer: string
  clientId: string
  clientSecret: string
  api: {
    audience: string
    clientId: string
    clientSecret: string
  }
}

export const authConfig = registerAs(
  AuthTokens.Auth0Config,
  (): Auth0Configuration => ({
    secret: get('AUTH0_SECRET').required(true).asString(),
    baseUrl: get('AUTH0_BASE_URL').required(true).asString(),
    issuer: get('AUTH0_ISSUER_BASE_URL').required(true).asString(),
    clientId: get('AUTH0_CLIENT_ID').required(true).asString(),
    clientSecret: get('AUTH0_CLIENT_SECRET').required(true).asString(),
    api: {
      audience: get('AUTH0_API_AUDIENCE').required(true).asString(),
      clientId: get('AUTH0_API_CLIENT_ID').required(true).asString(),
      clientSecret: get('AUTH0_API_CLIENT_SECRET').required(true).asString(),
    },
  }),
)
