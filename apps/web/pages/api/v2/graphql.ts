import { getAccessToken, getSession } from '@auth0/nextjs-auth0'
import { cLog } from '@codelab/shared/utils'
import { OGM } from '@neo4j/graphql-ogm'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import * as util from 'util'
// import { getSession } from 'next-auth/react'
import { getDriver } from '../../../src/neo4j-graphql/getDriver'
import { getSchema } from '../../../src/neo4j-graphql/getSchema'
import typeDefs from '../../../src/neo4j-graphql/typeDefs'

const driver = getDriver()
const neoSchema = getSchema(driver)
const path = '/api/v2/graphql'

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
  introspection: true,
})

const ogm = new OGM({ typeDefs, driver })
const User = ogm.model('User')
const startServer = apolloServer.start()

/**
 * next-auth is an open-source solution for Next.js and auth
 *
 * https://next-auth.js.org/tutorials/securing-pages-and-api-routes
 */
const handler: NextApiHandler = async (req, res) => {
  let session
  let accessToken

  try {
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

  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.end()

    return
  }

  /**
   * Instead of appending headers to the frontend GraphQL client, we could access session here in serverless then append at the middleware level
   */
  req.headers.authorization = `Bearer ${accessToken}`

  await startServer

  await apolloServer.createHandler({ path })(req, res)
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
