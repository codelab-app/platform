import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const ENDPOINT_CONFIG_KEY = 'graphql'

/**
 * graphqlConfig.KEY not available inside main.ts
 */
export const endpointConfig = registerAs(ENDPOINT_CONFIG_KEY, () => {
  return {
    // URL
    get apiAuthority() {
      return `${this.apiHostname}:${this.apiPort}`
    },
    get apiHostname() {
      return env.get('NEXT_PUBLIC_API_HOSTNAME').required().asPortNumber()
    },
    get apiPort() {
      return env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber()
    },
  }
})
