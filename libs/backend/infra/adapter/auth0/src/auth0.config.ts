import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const auth0Config = registerAs('auth0', () => ({
  audience: env.get('AUTH0_AUDIENCE').required().asUrlObject(),
  issuer_base_url: env.get('AUTH0_ISSUER_BASE_URL').required().asUrlString(),
  m2m: {
    clientId: env.get('AUTH0_M2M_CLIENT_ID').required().asString(),
    clientSecret: env.get('AUTH0_M2M_CLIENT_SECRET').required().asString(),
  },
}))
