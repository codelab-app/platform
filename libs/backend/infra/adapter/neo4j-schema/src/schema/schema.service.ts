import type { IResolvers } from '@graphql-tools/utils'
import type { GraphQLSchema } from 'graphql'
import type { Driver } from 'neo4j-driver'

import { Neo4jDriverService } from '@codelab/backend-infra-adapter/neo4j-driver'
import { getEnv } from '@codelab/shared/config/env'
import { mergeResolvers } from '@graphql-tools/merge'
import {
  Neo4jGraphQL,
  Neo4jGraphQLSubscriptionsCDCEngine,
} from '@neo4j/graphql'
import { Inject, Injectable } from '@nestjs/common'

import { ResolverService } from '../resolver/resolver.service'
import { typeDefs } from './type-defs'

/**
 * Your web app has a session (that's the cookie) used to verify the user.
 *
 * Your M2M app is using a M2M cookie, since there is no session or user.
 *
 * This is kind of a fuzzy case: the "backend" serves as both a backend to your web app AND an API for your M2M app.
 *
 * You can configure your middleware to respect both the session and the token
 *
 * https://community.auth0.com/t/authenticating-users-and-m2m-with-same-middleware/77369/5
 */
@Injectable()
export class SchemaService {
  constructor(
    private readonly neo4jDriverService: Neo4jDriverService,
    private readonly resolverService: ResolverService,
  ) {}

  async createSchema(): Promise<GraphQLSchema> {
    try {
      const engine = new Neo4jGraphQLSubscriptionsCDCEngine({
        driver: this.neo4jDriverService.driver,
        onlyGraphQLEvents: true,
      })

      const neo4jGraphQL = new Neo4jGraphQL({
        driver: this.neo4jDriverService.driver,
        features: {
          authorization: {
            key: {
              /**
               * JWK (JSON Web Key) - allows applications to retrieve public keys programmatically
               *
               * PEM (Privacy Enhanced Mail ) - Certificate of Base 64 encoded public key certificate
               *
               * - The JWK contains the public certificate in addition to other claims about the key.
               *
               * https://community.auth0.com/t/jwk-vs-pem-what-is-the-difference/61927
               */
              url: new URL(
                '.well-known/jwks.json',
                getEnv().auth0.issuerBaseUrl,
              ).href,
            },
          },
          filters: {
            String: {
              MATCHES: true,
            },
          },
          subscriptions: true,
        },
        resolvers: this.resolverService.getMergedResolvers(),
        typeDefs,
      })

      const schema = await neo4jGraphQL.getSchema()

      await neo4jGraphQL.checkNeo4jCompat({
        driver: this.neo4jDriverService.driver,
      })

      await neo4jGraphQL.assertIndexesAndConstraints({
        driver: this.neo4jDriverService.driver,
      })

      return schema
    } catch (error) {
      console.error('Error initializing GraphQL Schema:', error)
      throw error
    }
  }
}
