import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const ENDPOINT_CONFIG_KEY = 'graphql'

/**
 * graphqlConfig.KEY not available inside main.ts
 */
export const endpointConfig = registerAs(ENDPOINT_CONFIG_KEY, () => {
  return {
    graphqlApiPort: env.get('PLATFORM_API_HOST').required().asUrlObject().port,
  }
})
