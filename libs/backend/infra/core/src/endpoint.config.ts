import { registerAs } from '@nestjs/config'
import { get } from 'env-var'

export const ENDPOINT_CONFIG_KEY = 'ENDPOINT_CONFIG_KEY'

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
      return get('NEXT_PUBLIC_API_HOSTNAME').required().asString()
    },
    get apiPort() {
      return get('NEXT_PUBLIC_API_PORT').required().asPortNumber()
    },
    get baseApiPath() {
      return get('NEXT_PUBLIC_BASE_API_PATH').required().asString()
    },
  }
})
