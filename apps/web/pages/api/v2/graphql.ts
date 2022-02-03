import { getSession } from '@auth0/nextjs-auth0'
import { OGM } from '@neo4j/graphql-ogm'
import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
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

    return {}
  },
})

const ogm = new OGM({ typeDefs, driver })
const User = ogm.model('User')
const startServer = apolloServer.start()

const handler: NextApiHandler = async (req, res) => {
  // Get Next.js Auth0 session
  const session = await getSession(req, res)
  const accessToken = session?.accessToken

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

  await startServer

  await apolloServer.createHandler({ path })(req, res)
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
