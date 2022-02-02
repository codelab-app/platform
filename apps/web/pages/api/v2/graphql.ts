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

<<<<<<< Updated upstream
const driver = getDriver()
const neoSchema = getSchema(driver)
const apolloServer = new ApolloServer({ schema: neoSchema.schema })
const path = '/api/v2/graphql'
=======
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

const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD, AUTH0_ISSUER_BASE_URL } =
  process.env

if (!NEO4J_URI || !NEO4J_USER || !NEO4J_PASSWORD || !AUTH0_ISSUER_BASE_URL) {
  throw new Error('Missing env')
}

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD),
)

export const JWT_CLAIMS = 'https://api.codelab.ai/jwt/claims'

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  config: {
    jwt: {
      jwksEndpoint: new URL('.well-known/jwks.json', AUTH0_ISSUER_BASE_URL)
        .href,
      rolesPath: JWT_CLAIMS,
      // jwksEndpoint: 'https://YOUR_DOMAIN/.well-known/jwks.json',
      // rolesPath:
      // 'https://YOUR_DOMAIN/claims\\.https://YOUR_DOMAIN/claims/roles',
    },
  },
})

const apolloServer = new ApolloServer({
  schema: neoSchema.schema,
  context: ({ req }) => {
    console.log(req)

    return {}
  },
})
>>>>>>> Stashed changes

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
