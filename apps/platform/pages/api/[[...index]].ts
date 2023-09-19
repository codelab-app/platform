import {
  authMiddleware,
  corsMiddleware,
  nextProxyMiddleware,
} from '@codelab/backend/infra/adapter/graphql'
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res)
  await authMiddleware(req, res)
  await nextProxyMiddleware(req, res)
}

export default handler
