import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

export const auth0Config = registerAs('auth0', () => {
  const auth0Domain = get('AUTH0_DOMAIN').required().asString()

  return {
    auth0_domain: auth0Domain,
    issuer_base_url: new URL('/', `https://${auth0Domain}`).toString(),
  }
})

export const auth0M2mConfig = registerAs('auth0-m2m', () => ({
  clientId: get('AUTH0_M2M_CLIENT_ID').required().asString(),
  clientSecret: get('AUTH0_M2M_CLIENT_SECRET').required().asString(),
}))
