import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { EnvBuilder } from '@codelab/shared/env'
import type { IResolvers } from '@graphql-tools/utils'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { Neo4jGraphQLAuthJWKSPlugin } from '@neo4j/graphql-plugin-auth'
import type { Driver } from 'neo4j-driver'
import { typeDefs } from './typeDefs'

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
export const getSchema = (driver: Driver, resolvers: IResolvers) =>
  new Neo4jGraphQL({
    typeDefs,
    driver,
    resolvers,
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
          EnvBuilder().auth0.issuer_base_url,
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
    config: {
      enableRegex: true,
    },
  })
