import {
  authMiddleware,
  corsMiddleware,
  nextProxyMiddleware,
} from '@codelab/backend/infra/adapter/graphql'
import { auth0Instance } from '@codelab/frontend/infra/auth0'
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res)
  await authMiddleware(req, res)
  await nextProxyMiddleware(req, res)
}

// export default auth0Instance().withApiAuthRequired(handler)
export default handler
