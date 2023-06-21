import type { BaseContext, ContextFunction } from '@apollo/server'
import { ApolloServer } from '@apollo/server'
import type { NextApiRequest } from '@codelab/backend/abstract/types'
import {
  getDriver,
  getSchema,
  resolvers,
} from '@codelab/backend/infra/adapter/neo4j'
import { mergeResolvers } from '@graphql-tools/merge'
import type { NextApiResponse } from 'next'
import * as util from 'util'
import { BASIC_LOGGING } from './logger'

const driver = getDriver()

export const neoSchema = getSchema(driver, mergeResolvers([resolvers]))

// https://community.apollographql.com/t/allow-cookies-to-be-sent-alongside-request/920/13

// export const apolloServerContext: ContextFunction<
//   [NextApiRequest],
//   BaseContext
// > = async (req) => {
//   const user = req.user

//   return {
//     req,
//     user,
//   }
// }

// export const apolloServer = async () => {
//   const schema = await neoSchema.getSchema()

//   await neoSchema.assertIndexesAndConstraints({
//     driver,
//     options: { create: true },
//   })

//   const server = new ApolloServer({
//     formatError: (err) => {
//       // console.error(util.inspect(err, false, null, true))

//       // Otherwise return the original error. The error can also
//       // be manipulated in other ways, as long as it's returned.
//       return err
//     },
//     introspection: true,
//     plugins: [BASIC_LOGGING],
//     schema,
//     // plugins: [ApolloServerPluginInlineTrace()],
//   })

//   // await apolloServer.start()

//   return server
// }
