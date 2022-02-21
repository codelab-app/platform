import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { Driver } from 'neo4j-driver'
import { Config } from '../../env/env'
import { resolvers } from '../resolvers'
import typeDefs from './schema'

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
    config: {
      jwt: {
        /**
         * Either jwks or secret
         */
        jwksEndpoint: new URL(
          '.well-known/jwks.json',
          Config.auth0.issuer_base_url,
        ).href,
        // secret: Config.auth0.secret,
        /**
         * Use "dot path" since our roles path is nested
         *
         * https://githubmemory.com/repo/neo4j/graphql/issues/241
         *
         * Found out that we need to `Use \\. if you have a . in the key.`
         */
        rolesPath: `${escapeDotPathKeys(JWT_CLAIMS)}.roles`,
        /**
         * This way we could access GraphQL without a valid token
         */
        noVerify: true,
      },
    },
  })
