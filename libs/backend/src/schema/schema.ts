import { JWT_CLAIMS } from '@codelab/shared/abstract/core'
import { Config } from '@codelab/shared/utils'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchema } from '@graphql-tools/load'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { Neo4jGraphQL } from '@neo4j/graphql'
import { Neo4jGraphQLAuthJWKSPlugin } from '@neo4j/graphql-plugin-auth'
import { gql } from 'apollo-server-micro'
import { Driver } from 'neo4j-driver'
import * as path from 'path'
import { resolvers } from '../resolvers'
import { typeDefs } from './typeDefs'

/**
 * `.` -> `\\.`
 */
const escapeDotPathKeys = (key: string) => {
  return key.replace(/\./g, '\\.')
}

/**
 * https://www.graphql-tools.com/docs/migration/migration-from-import
 *
 * Allow us to import GraphQL types
 */
const schemaFolder = path.resolve(process.cwd(), 'libs/backend/src/schema')

/**
 * loadFilesSync doesn't support import syntax. loadSchema supports loading SDL files with import syntax. You can find all.those information in the documentation.
 *
 * https://github.com/ardatan/graphql-tools/issues/1691#issuecomment-650577093
 */
const fieldSchema = loadSchema(
  // Field graphql
  [path.resolve(schemaFolder, 'type/field.graphql')],
  {
    loaders: [new GraphQLFileLoader()],
  },
)

const mergedSchema = async () =>
  mergeTypeDefs([
    await fieldSchema,
    gql`
      ${typeDefs}
    `,
  ])

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
export const getSchema = async (driver: Driver) =>
  new Neo4jGraphQL({
    typeDefs: await mergedSchema(),
    driver,
    resolvers,
    plugins: {
      /**
       * JWK (JSON Web Key) - allows applications to retrieve public keys programmatically
       * PEM (Privacy Enhanced Mail ) - Certificate of Base 64 encoded public key certificate
       *
       * - The JWK contains the public certificate in addition to other claims about the key.
       *
       * https://community.auth0.com/t/jwk-vs-pem-what-is-the-difference/61927
       */
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
