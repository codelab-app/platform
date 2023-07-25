import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { getEnv } from '@codelab/shared/config'
import { mergeResolvers } from '@graphql-tools/merge'
import type { IResolvers } from '@graphql-tools/utils'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { Neo4jGraphQLAuthJWKSPlugin } from '@neo4j/graphql-plugin-auth'
import type { Provider } from '@nestjs/common'
import type { Driver } from 'neo4j-driver'
import { NEO4J_DRIVER_PROVIDER } from '../infra/neo4j.constant'
import { PURE_RESOLVER_PROVIDER } from '../resolver'
import { OGM_RESOLVER_PROVIDER } from '../resolver/ogm-resolver/ogm-resolver.constant'
import { GRAPHQL_SCHEMA_PROVIDER } from './schema.constant'
import { typeDefs } from './type-defs'

/**
 * `.` -> `\\.`
 */
const escapeDotPathKeys = (key: string) => {
  return key.replace(/\./g, '\\.')
}

/**
 * Your web app has a session (that’s the cookie) used to verify the user.
 *
 * Your M2M app is using a M2M cookie, since there is no session or user.
 *
 * This is kind of a fuzzy case: the “backend” serves as both a backend to your web app AND an API for your M2M app.
 *
 * You can configure your middleware to respect both the session and the token
 *
 * https://community.auth0.com/t/authenticating-users-and-m2m-with-same-middleware/77369/5
 */
export const GraphQLSchemaProvider: Provider = {
  inject: [
    NEO4J_DRIVER_PROVIDER,
    PURE_RESOLVER_PROVIDER,
    OGM_RESOLVER_PROVIDER,
  ],
  provide: GRAPHQL_SCHEMA_PROVIDER,
  useFactory: async (
    driver: Driver,
    pureResolvers: IResolvers,
    ogmResolvers: IResolvers,
  ) => {
    const neo4jGraphQL = new Neo4jGraphQL({
      config: {
        enableRegex: true,
      },
      driver,
      plugins: {
        /**
         * JWK (JSON Web Key) - allows applications to retrieve public keys programmatically
         *
         * PEM (Privacy Enhanced Mail ) - Certificate of Base 64 encoded public key certificate
         *
         * - The JWK contains the public certificate in addition to other claims about the key.
         *
         * https://community.auth0.com/t/jwk-vs-pem-what-is-the-difference/61927
         */
        auth: new Neo4jGraphQLAuthJWKSPlugin({
          jwksEndpoint: new URL(
            '.well-known/jwks.json',
            getEnv().auth0.issuerBaseUrl,
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
      resolvers: mergeResolvers([pureResolvers, ogmResolvers]),
      typeDefs,
    })

    const schema = await neo4jGraphQL.getSchema()

    await neo4jGraphQL.assertIndexesAndConstraints({
      driver,
      options: { create: true },
    })

    return schema
  },
}
