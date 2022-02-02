import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import { getDriver } from '../../src/neo4j-graphql/getDriver'
import { getSchema } from '../../src/neo4j-graphql/getSchema'

const driver = getDriver()
const neoSchema = getSchema(driver)
const apolloServer = new ApolloServer({ schema: neoSchema.schema })
const startServer = apolloServer.start()

export const handler: NextApiHandler = async (req, res) => {
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
    path: '/api/graphql-neo4j',
  })(req, res)
}

export default handler

export const config = { api: { bodyParser: false } }
