import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const auth0Config = registerAs('auth0', () => ({
  audience: env.get('AUTH0_AUDIENCE').required().asUrlObject(),
  clientId: env.get('AUTH0_CLIENT_ID').required().asString(),
  clientSecret: env.get('AUTH0_CLIENT_SECRET').required().asString(),
}))
