import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const GRAPHQL_CONFIG_KEY = 'graphql'

/**
 * graphqlConfig.KEY not available inside main.ts
 */
export const graphqlConfig = registerAs(GRAPHQL_CONFIG_KEY, () => {
  return {
    graphqlApiPort: env.get('GRAPHQL_API_HOST').required().asUrlObject().port,
  }
})
