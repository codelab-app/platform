import { getAccessToken, getSession } from '@auth0/nextjs-auth0'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import * as util from 'util'
import { getDriver } from '../../src/neo4j-graphql/getDriver'
import { getSchema } from '../../src/neo4j-graphql/getSchema'
import { generateOgmTypes, User } from '../../src/neo4j-graphql/model'

const neoSchema = getSchema(getDriver())
const path = '/api/graphql'

// https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920/13

const apolloServer = new ApolloServer({
  schema: neoSchema.schema,
  context: ({ req }) => {
    // console.log(req)

    return { req }
  },
  formatError: (err) => {
    console.error(util.inspect(err, false, null, true))

    // Otherwise return the original error. The error can also
    // be manipulated in other ways, as long as it's returned.
    return err
  },
  // introspection: true,
  // plugins: [ApolloServerPluginInlineTrace()],
})

const startServer = apolloServer.start()

/**
 * Allow local HTTPS with https://github.com/vercel/next.js/discussions/10935#discussioncomment-434842
 */

/**
 * next-auth is an open-source solution for Next.js and auth
 *
 * https://next-auth.js.org/tutorials/securing-pages-and-api-routes
 */
const handler: NextApiHandler = async (req, res) => {
  // console.log(req.method)
  // await cors(req, res)

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

  // Run cors
  // await cors(req, res)

  let session
  let accessToken

  try {
    /**
     * Requires `headers.cookie` to be set by client
     */
    session = await getSession(req, res)
    accessToken = (await getAccessToken(req, res)).accessToken
  } catch (e) {
    console.error(e)
  }

  // console.log(session?.user)

  // await User.delete({
  //   where: {
  //     auth0Id: 'google-oauth2|116956556863062538891',
  //   },
  // })

  /**
   * Check for upsert only when user exists
   */
  if (session?.user) {
    const user = session.user

    const [existing] = await User.find({
      where: {
        auth0Id: user.sub,
      },
    })

    if (existing) {
      // console.log(`User with email ${user.email} already exists!`)
    } else {
      const { users } = await User.create({
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
  await apolloServer
    .createHandler({ path })(req, res)
    .then(async () => {
      console.log(process.env.NODE_ENV)

      if (process.env.NODE_ENV === 'development') {
        await generateOgmTypes()
        // execa.commandSync(`yarn codegen-v2`, {
        //   stdio: 'inherit',
        // })
      }
    })
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
