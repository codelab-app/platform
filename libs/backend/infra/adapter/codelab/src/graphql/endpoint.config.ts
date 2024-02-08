import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const ENDPOINT_CONFIG_KEY = 'graphql'

/**
 * graphqlConfig.KEY not available inside main.ts
 */
export const endpointConfig = registerAs(ENDPOINT_CONFIG_KEY, () => {
  return {
    get graphqlApiPort() {
      const apiHost = env
        .get('NEXT_PUBLIC_PLATFORM_API_HOST')
        .required()
        .asUrlObject()

      // for local development and CI, port is specified as part of NEXT_PUBLIC_PLATFORM_API_HOST,
      // e.g. http://127.0.0.1:4000, but for production, the value of NEXT_PUBLIC_PLATFORM_API_HOST
      // is plain URL, e.g. https://api.codelab.app, so need to fallback to value from DO env variable
      return apiHost.port || env.get('PORT').required().asPortNumber()
    },
  }
})
