import { getSession } from '@auth0/nextjs-auth0'
import { OGM } from '@neo4j/graphql-ogm'
import { ApolloServer, gql } from 'apollo-server-micro'
import fs from 'fs'
import {
  buildClientSchema,
  getIntrospectionQuery,
  IntrospectionQuery,
  print,
  printSchema,
} from 'graphql'
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

const ogm = new OGM({ typeDefs: print(typeDefs), driver })
const User = ogm.model('User')

const startServer = apolloServer.start().then(async () => {
  /**
   * Get schema from ApolloServer
   *
   * https://stackoverflow.com/a/62484577/2159920
   */
  const { data } = await apolloServer.executeOperation({
    query: getIntrospectionQuery(),
  })

  const schema = buildClientSchema(data as IntrospectionQuery)
  // console.log('server started!')
  // console.log(printSchema(schema))

  fs.writeFile('schema.v2.api.graphql', printSchema(schema), (err) => {
    console.error(err)
  })
})

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
      console.log(`User with email ${user.email} already exists!`)
    } else {
      const { users } = await User.create({
        input: [
          {
            auth0Id: user.sub,
            email: user.email,
          },
        ],
      })

      console.log('Created', users)
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

  await apolloServer.createHandler({
    path,
  })(req, res)
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
