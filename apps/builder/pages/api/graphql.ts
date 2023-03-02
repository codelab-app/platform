/**
 * This file is under `api` code so can import backend code
 */
import type { NextApiRequest } from '@codelab/backend/abstract/types'
import {
  getDriver,
  getSchema,
  resolvers,
} from '@codelab/backend/infra/adapter/neo4j'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { logger } from '@codelab/shared/adapter/logging'
import { EnvBuilder } from '@codelab/shared/env'
import { mergeResolvers } from '@graphql-tools/merge'
import { ApolloServer } from 'apollo-server-micro'
import type {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base'
import type {
  BaseContext,
  GraphQLRequestContext,
  GraphQLRequestContextWillSendResponse,
} from 'apollo-server-types'
import type { NextApiHandler } from 'next'
import * as util from 'util'

const driver = getDriver()
const neoSchema = getSchema(driver, mergeResolvers([resolvers]))
const path = '/api/graphql'
// https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920/13
let apolloServer: ApolloServer

const BASIC_LOGGING: ApolloServerPlugin = {
  requestDidStart: (requestContext: GraphQLRequestContext<BaseContext>) => {
    if (!EnvBuilder().next.enableAPILogging) {
      return Promise.resolve()
    }

    logger.info(
      `Processing request ${JSON.stringify(requestContext.request, null, 2)}`,
    )

    // logger.info(JSON.stringify(requestContext.req.query || {}, null, 2))
    // logger.info(JSON.stringify(requestContext.req.variables || {}, null, 2))

    const res: GraphQLRequestListener<BaseContext> = {
      willSendResponse: (
        context: GraphQLRequestContextWillSendResponse<BaseContext>,
      ) => {
        logger.info(
          `Responding request ${JSON.stringify(context.response, null, 2)}`,
        )

        return Promise.resolve()
      },
    }

    return Promise.resolve(res)
  },
}

const startServer = neoSchema
  .getSchema()
  .then(async (schema) => {
    apolloServer = new ApolloServer({
      schema,
      plugins: [BASIC_LOGGING],
      context: ({ req }: { req: NextApiRequest }) => {
        const user = req.user

        return {
          req,
          user,
        }
      },
      formatError: (err) => {
        console.error(util.inspect(err, false, null, true))

        // Otherwise return the original error. The error can also
        // be manipulated in other ways, as long as it's returned.
        return err
      },
      introspection: true,
      // plugins: [ApolloServerPluginInlineTrace()],
    })
  })
  .then(() =>
    neoSchema
      .assertIndexesAndConstraints({ options: { create: true }, driver })
      .then(() => apolloServer.start()),
  )

/**
 * Allow local HTTPS with https://github.com/vercel/next.js/discussions/10935#discussioncomment-434842
 */

/**
 * next-auth is an open-source solution for Next.js and auth
 *
 * https://next-auth.js.org/tutorials/securing-pages-and-api-routes
 */
const handler: NextApiHandler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')

  /**
   * Not an actual request
   */
  if (req.method === 'OPTIONS') {
    res.end()

    return
  }

  try {
    /**
     * Requires `headers.cookie` to be set by client
     */
    const session = await auth0Instance.getSession(req, res)

    if (session?.user) {
      Object.assign(req, { user: session.user })
    }

    const accessToken = (await auth0Instance.getAccessToken(req, res))
      .accessToken

    /**
     * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
     */
    if (accessToken) {
      req.headers.authorization = `Bearer ${accessToken}`
    }
  } catch (error) {
    console.log('error when get access token', error)

    // Apollo studio polls the graphql schema every second, and it pollutes the log
    if (
      process.env.NODE_ENV !== 'development' ||
      !req.headers['origin']?.includes('studio.apollographql')
    ) {
      // console.error(e)
    }
  }

  await startServer

  await apolloServer.createHandler({ path })(req, res)
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
