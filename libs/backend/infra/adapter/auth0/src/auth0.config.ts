import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const auth0Config = registerAs('auth0', () => ({
  // This is shared
  audience: env.get('AUTH0_AUDIENCE').required().asUrlObject(),
  m2m: {
    clientId: env.get('AUTH0_M2M_CLIENT_ID').required().asString(),
    clientSecret: env.get('AUTH0_M2M_CLIENT_SECRET').required().asString(),
  },
}))
