import type { NextApiRequest } from '@codelab/backend/abstract/types'
import {
  getDriver,
  getSchema,
  resolvers,
} from '@codelab/backend/infra/adapter/neo4j'
import { mergeResolvers } from '@graphql-tools/merge'
import { ApolloServer } from 'apollo-server-micro'
import * as util from 'util'
import { BASIC_LOGGING } from './logger'

const driver = getDriver()
const neoSchema = getSchema(driver, mergeResolvers([resolvers]))

// https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920/13

export const startServer = async () => {
  const schema = await neoSchema.getSchema()

  const apolloServer = new ApolloServer({
    context: ({ req }: { req: NextApiRequest }) => {
      const user = req.user

      return {
        req,
        user,
      }
    },
    formatError: (err) => {
      console.error(util.inspect(err, false, null, true))

      // Otherwise return the original error. The error can also
      // be manipulated in other ways, as long as it's returned.
      return err
    },
    introspection: true,
    plugins: [BASIC_LOGGING],
    schema,
    // plugins: [ApolloServerPluginInlineTrace()],
  })

  await neoSchema.assertIndexesAndConstraints({
    driver,
    options: { create: true },
  })

  await apolloServer.start()

  return apolloServer
}
