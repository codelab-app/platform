import { Neo4jGraphQL } from '@neo4j/graphql'
import { ApolloServer, gql } from 'apollo-server-micro'
import fs from 'fs'
import {
  buildClientSchema,
  getIntrospectionQuery,
  IntrospectionQuery,
  printSchema,
} from 'graphql'
import neo4j from 'neo4j-driver'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const typeDefs = gql`
  type User @exclude(operations: [CREATE, UPDATE, DELETE]) {
    apps: [App] @relationship(type: "OWNED_BY", direction: IN)
  }
  type App {
    owner: [User] @relationship(type: "OWNED_BY", direction: OUT)
    name: String!
  }
  # type Movie @exclude(operations: [CREATE, UPDATE, DELETE]) {
  #   title: String!
  #   actors: [Actor] @relationship(type: "ACTED_IN", direction: IN)
  # }
  # type Actor @exclude(operations: [UPDATE, DELETE]) {
  #   name: String!
  #   actedIn: [Movie] @relationship(type: "ACTED_IN", direction: OUT)
  # }
`

const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = process.env

if (!NEO4J_URI || !NEO4J_USER || !NEO4J_PASSWORD) {
  throw new Error('Missing "NEO4J_URI", "NEO4J_USER", or "NEO4J_PASSWORD"')
}

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD),
)

const neoSchema = new Neo4jGraphQL({ typeDefs, driver })
const apolloServer = new ApolloServer({ schema: neoSchema.schema })

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
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com',
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )

  if (req.method === 'OPTIONS') {
    res.end()

    return
  }

  await startServer

  await apolloServer.createHandler({
    path: '/api/v2/graphql',
  })(req, res)
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
