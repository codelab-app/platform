import { ApolloServer } from 'apollo-server-micro'
import fs from 'fs'
import {
  buildClientSchema,
  getIntrospectionQuery,
  IntrospectionQuery,
  printSchema,
} from 'graphql'
import { NextApiHandler } from 'next'
import { getDriver } from '../../../src/neo4j-graphql/getDriver'
import { getSchema } from '../../../src/neo4j-graphql/getSchema'

const driver = getDriver()
const neoSchema = getSchema(driver)
const apolloServer = new ApolloServer({ schema: neoSchema.schema })
const path = '/api/v2/graphql'

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
