import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { Driver } from 'neo4j-driver'
import { Config } from '../env/env'
import typeDefs from './typeDefs'

export const getSchema = (driver: Driver) =>
  new Neo4jGraphQL({
    typeDefs,
    driver,
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
         */
        rolesPath: `${JWT_CLAIMS}.roles`,
        /**
         * This way we could access GraphQL without a valid token
         */
        noVerify: true,
      },
    },
  })
