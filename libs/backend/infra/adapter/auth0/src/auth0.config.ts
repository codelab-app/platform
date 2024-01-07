import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const auth0Config = registerAs('auth0', () => ({
  // Not used, but env is used by Auth0 client, added here for validation purposes
  // base_url: env.get('AUTH0_BASE_URL').required().asUrlString(),
  issuer_base_url: env.get('AUTH0_ISSUER_BASE_URL').required().asUrlString(),
}))

export const auth0M2mConfig = registerAs('auth0-m2m', () => ({
  clientId: env.get('AUTH0_M2M_CLIENT_ID').required().asString(),
  clientSecret: env.get('AUTH0_M2M_CLIENT_SECRET').required().asString(),
}))
