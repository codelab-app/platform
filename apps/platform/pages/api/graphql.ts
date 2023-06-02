/**
 * This file is under `api` code so can import backend code
 */
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import {
  apolloServer,
  apolloServerContext,
  authMiddleware,
  corsMiddleware,
} from '@codelab/backend/infra/adapter/graphql'
import type { NextApiHandler } from 'next'

/**
 * Taken from here https://github.com/vercel/next.js/tree/canary/examples/with-apollo-neo4j-graphql
 */
const startServer = async () => {
  const nextHandler = await startServerAndCreateNextHandler(
    await apolloServer(),
    {
      context: apolloServerContext,
    },
  )

  const handler: NextApiHandler = async (req, res) => {
    if (!corsMiddleware(req, res)) {
      return
    }

    await authMiddleware(req, res)

    return nextHandler(req, res)
  }

  return handler
}

export default await startServer()
