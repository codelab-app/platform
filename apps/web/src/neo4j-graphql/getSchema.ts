import { Neo4jGraphQL } from '@neo4j/graphql'
import { JWT_CLAIMS } from 'libs/backend/modules/user/src/infra/auth/jwt.interface'
import { Driver } from 'neo4j-driver'
import { AUTH0_ISSUER_BASE_URL } from '../env/env'
import typeDefs from './type-defs'

export const getSchema = (driver: Driver) =>
  new Neo4jGraphQL({
    typeDefs,
    driver,
    config: {
      jwt: {
        jwksEndpoint: new URL('.well-known/jwks.json', AUTH0_ISSUER_BASE_URL)
          .href,
        rolesPath: JWT_CLAIMS,
        // jwksEndpoint: 'https://YOUR_DOMAIN/.well-known/jwks.json',
        // rolesPath:
        // 'https://YOUR_DOMAIN/claims\\.https://YOUR_DOMAIN/claims/roles',
      },
    },
  })
