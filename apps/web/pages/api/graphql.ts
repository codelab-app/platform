import { getAccessToken, getSession } from '@auth0/nextjs-auth0'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import * as util from 'util'
import { generateOgmTypes } from '../../src/graphql/generate-ogm-types'
import { getDriver } from '../../src/graphql/infra/driver'
import { User } from '../../src/graphql/model'
import { getSchema } from '../../src/graphql/schema/neoSchema'

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
      process.env.NODE_ENV === 'development' &&
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
    const UserModel = await User()

    const [existing] = await UserModel.find({
      where: {
        auth0Id: user.sub,
      },
    })

    if (existing) {
      // console.log(`User with email ${user.email} already exists!`)
    } else {
      const { users } = await UserModel.create({
        input: [
          {
            auth0Id: user.sub,
            email: user.email,
          },
        ],
      })

      // console.log('Created', users)
    }
  }

  /**
   * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
   */
  req.headers.authorization = `Bearer ${accessToken}`

  await startServer
  await apolloServer.createHandler({ path })(req, res)

  /**
   * Uncomment this if you want to run codegen, codegen will run then exit the whole process. Server won't run successfully unless this is commented
   *
   * Keep in mind you'll need to access a web page that loads this api graphql route, otherwise this won't be triggered
   */
  await generateOgmTypes()
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
