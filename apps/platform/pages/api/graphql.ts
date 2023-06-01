/**
 * This file is under `api` code so can import backend code
 */
import {
  authMiddleware,
  corsMiddleware,
  startServer,
} from '@codelab/backend/infra/adapter/graphql'
import type { ApolloServer } from 'apollo-server-micro'
import type { NextApiHandler } from 'next'

const path = '/api/graphql'
let apolloServerInstance: ApolloServer | undefined

if (apolloServerInstance) {
  console.log('Exists')
}

/**
 * Allow local HTTPS with https://github.com/vercel/next.js/discussions/10935#discussioncomment-434842
 */

/**
 * next-auth is an open-source solution for Next.js and auth
 *
 * https://next-auth.js.org/tutorials/securing-pages-and-api-routes
 */
const handler: NextApiHandler = async (req, res) => {
  apolloServerInstance ??= await startServer()

  if (!corsMiddleware(req, res)) {
    return
  }

  await authMiddleware(req, res)

  await apolloServerInstance.createHandler({ path })(req, res)
}

export default handler

export const config = {
  api: {
    bodyParser: false,
  },
}
