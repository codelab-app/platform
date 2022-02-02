import { Neo4jGraphQL } from '@neo4j/graphql'
import { JWT_CLAIMS } from 'libs/backend/modules/user/src/infra/auth/jwt.interface'
import { Driver } from 'neo4j-driver'
import { Config } from '../env/env'
import typeDefs from './typeDefs'

export const getSchema = (driver: Driver) =>
  new Neo4jGraphQL({
    typeDefs,
    driver,
    config: {
      jwt: {
        jwksEndpoint: new URL(
          '.well-known/jwks.json',
          Config.auth0.issuer_base_url,
        ).href,
        rolesPath: JWT_CLAIMS,
        // jwksEndpoint: 'https://YOUR_DOMAIN/.well-known/jwks.json',
        // rolesPath:
        // 'https://YOUR_DOMAIN/claims\\.https://YOUR_DOMAIN/claims/roles',
      },
    },
  })
