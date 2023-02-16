/**
 * This file is under `api` code so can import backend code
 */
import type {
  GraphQLRequestContext,
  NextApiRequest,
} from '@codelab/backend/abstract/types'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { resolvers } from '@codelab/backend/graphql'
import { getDriver, getSchema } from '@codelab/backend/infra/adapter/neo4j'
import type { Auth0SessionUser } from '@codelab/shared/abstract/core'
import { auth0Instance } from '@codelab/shared/adapter/auth0'
import { logger } from '@codelab/shared/adapter/logging'
import { EnvBuilder } from '@codelab/shared/env'
import { ApolloServer } from 'apollo-server-micro'
import type { NextApiHandler } from 'next'
import * as util from 'util'

/*eslint-disable */

const driver = getDriver()
const neoSchema = getSchema(driver, resolvers)
const path = '/api/graphql'
// https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920/13
let apolloServer: ApolloServer

const BASIC_LOGGING = {
  requestDidStart(requestContext: any) {
    if (!EnvBuilder().next.enableAPILogging) {
      return {}
    }

    logger.info(
      `Processing request ${JSON.stringify(requestContext.request, null, 2)}`,
    )

    // logger.info(JSON.stringify(requestContext.req.query || {}, null, 2))
    // logger.info(JSON.stringify(requestContext.req.variables || {}, null, 2))

    return {
      willSendResponse(context: any) {
        logger.info(
          `Responding request ${JSON.stringify(context.response, null, 2)}`,
        )

        return Promise.resolve({})
      },
    }
  },
}

const startServer = neoSchema
  .getSchema()
  .then(async (schema) => {
    apolloServer = new ApolloServer({
      schema,
      plugins: [BASIC_LOGGING as any],
      context: ({ req }: { req: NextApiRequest }): GraphQLRequestContext => {
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

  let session
  let accessToken

  try {
    /**
     * Requires `headers.cookie` to be set by client
     */
    session = await auth0Instance.getSession(req, res)

    Object.assign(req, { user: session?.user })

    accessToken = (await auth0Instance.getAccessToken(req, res)).accessToken
  } catch (e) {
    console.log('error when get access token', e)

    // Apollo studio polls the graphql schema every second, and it pollutes the log
    if (
      process.env.NODE_ENV !== 'development' ||
      !req.headers['origin']?.includes('studio.apollographql')
    ) {
      // console.error(e)
    }
  }

  if (
    session?.user &&
    // If localhost enable this
    process.env['NEXT_PUBLIC_BUILDER_HOST']?.includes('127.0.0.1')
  ) {
    const userSession = session.user as Auth0SessionUser
    const userRepository = new UserRepository()
    const user = User.fromSession(userSession)

    await userRepository.save(user, { auth0Id: user.auth0Id })
  }

  /**
   * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
   */
  if (accessToken) {
    req.headers.authorization = `Bearer ${accessToken}`
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
