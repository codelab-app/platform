import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const graphqlConfig = registerAs('neo4j', () => {
  console.log(env.get('GRAPHQL_API_HOST').asString())

  return {
    graphqlApiPort: env.get('GRAPHQL_API_HOST').required().asUrlObject().port,
  }
})
