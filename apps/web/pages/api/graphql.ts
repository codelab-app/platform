import { getAccessToken, getSession } from '@auth0/nextjs-auth0'
import {
  generateOgmTypes,
  getDriver,
  getSchema,
  UserModel,
} from '@codelab/backend'
import { ApolloServer } from 'apollo-server-micro'
import { get } from 'env-var'
import { NextApiHandler } from 'next'
import * as util from 'util'

const driver = getDriver()
const neoSchema = getSchema(driver)
const path = '/api/graphql'
// https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920/13
let apolloServer: ApolloServer

const startServer = neoSchema
  .getSchema()
  .then((schema) => {
    apolloServer = new ApolloServer({
      schema,
      context: ({ req }) => ({
        req,
      }),
      formatError: (err) => {
        console.error(util.inspect(err, false, null, true))

        // Otherwise return the original error. The error can also
        // be manipulated in other ways, as long as it's returned.
        return err
      },
      // introspection: true,
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
      console.error(e)
    }
  }

  /**
   * Check for upsert only when user exists
   */
  if (session?.user) {
    const user = session.user
    const User = await UserModel()

    const [existing] = await User.find({
      where: {
        auth0Id: user.sub,
      },
    })

    if (existing) {
      // console.log(`User with email ${user.email} already exists!`)
    } else {
      try {
        const { users } = await (
          await UserModel()
        ).create({
          input: [
            {
              auth0Id: user.sub,
              email: user.email,
            },
          ],
        })
      } catch (e) {
        console.error(e)
      }

      // console.log('Created', users)
    }
  }

  /**
   * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
   */
  if (accessToken) {
    req.headers.authorization = `Bearer ${accessToken}`
  }

  await startServer
  await apolloServer.createHandler({ path })(req, res)

  const devGenerateOgmTypes = get('DEV_GENERATE_OGM_TYPES')
    .default('false')
    .asBoolStrict()

  if (devGenerateOgmTypes) {
    await generateOgmTypes()
  }
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
