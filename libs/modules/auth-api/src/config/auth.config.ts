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

export const authConfig = registerAs<() => Auth0Configuration>(
  AuthTokens.Auth0Config.toString(),
  () => {
    let issuer = get('AUTH0_ISSUER_BASE_URL').required().asString()

    if (issuer.substr(-1) !== '/') {
      issuer = issuer + '/'
    }

    return {
      secret: get('AUTH0_SECRET').required().asString(),
      baseUrl: get('AUTH0_BASE_URL').required().asString(),
      issuer,
      clientId: get('AUTH0_CLIENT_ID').required().asString(),
      clientSecret: get('AUTH0_CLIENT_SECRET').required().asString(),
      api: {
        audience: get('AUTH0_AUDIENCE').required().asString(),
        clientId: get('AUTH0_API_CLIENT_ID').required().asString(),
        clientSecret: get('AUTH0_API_CLIENT_SECRET').required().asString(),
      },
    }
  },
)
