import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { Config } from '@codelab/shared/utils'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { Neo4jGraphQLAuthJWKSPlugin } from '@neo4j/graphql-plugin-auth'
import { Driver } from 'neo4j-driver'
import { resolvers } from '../resolvers'
import typeDefs from './typeDefs'

/**
 * `.` -> `\\.`
 */
const escapeDotPathKeys = (key: string) => {
  return key.replace(/\./g, '\\.')
}

export const getSchema = (driver: Driver) =>
  new Neo4jGraphQL({
    typeDefs,
    driver,
    resolvers,
    plugins: {
      auth: new Neo4jGraphQLAuthJWKSPlugin({
        jwksEndpoint: new URL(
          '.well-known/jwks.json',
          Config().auth0.issuer_base_url,
        ).href,
        /**
         * Use "dot path" since our roles path is nested
         *
         * https://githubmemory.com/repo/neo4j/graphql/issues/241
         *
         * Found out that we need to `Use \\. if you have a . in the key.`
         */
        rolesPath: `${escapeDotPathKeys(JWT_CLAIMS)}.roles`,
      }),
    },
  })
