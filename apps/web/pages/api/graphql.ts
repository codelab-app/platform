import { getAccessToken, getSession } from '@auth0/nextjs-auth0'
import {
  generateOgmTypes,
  getDriver,
  getSchema,
  UserOGM,
} from '@codelab/backend'
import { upsertUser } from '@codelab/frontend/modules/user'
import { Auth0SessionUser } from '@codelab/shared/abstract/core'
import { Config } from '@codelab/shared/utils'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import * as util from 'util'

const driver = getDriver()
const neoSchema = getSchema(driver)
const path = '/api/graphql'
// https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920/13
let apolloServer: ApolloServer

const startServer = neoSchema
  .getSchema()
  .then(async (schema) => {
    apolloServer = new ApolloServer({
      schema,
      context: ({ req }) => {
        // console.log(req.headers)

        return {
          req,
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
    session = await getSession(req, res)
    accessToken = (await getAccessToken(req, res)).accessToken
  } catch (e) {
    // Apollo studio polls the graphql schema every second, and it pollutes the log
    if (
      process.env.NODE_ENV !== 'development' ||
      !req.headers['origin']?.includes('studio.apollographql')
    ) {
      // console.error(e)
    }
  }

  /**
   * Check for upsert only when user exists
   */
  // TODO: should think of a way so we don't need to call this everytime
  if (session?.user && Config().dev.upsert_user_middleware) {
    const user = session.user as Auth0SessionUser

    await upsertUser(await UserOGM(), user)
  }

  /**
   * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
   */
  if (accessToken) {
    req.headers.authorization = `Bearer ${accessToken}`
  }

  await startServer
  await apolloServer.createHandler({ path })(req, res)

  if (Config().dev.generate_ogm_types) {
    await generateOgmTypes()
  }
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
