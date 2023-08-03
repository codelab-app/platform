import {
  authMiddleware,
  corsMiddleware,
  nextProxyMiddleware,
} from '@codelab/backend/infra/adapter/graphql'
import { getEnv } from '@codelab/shared/config'
import type { NextApiHandler } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res)
  await authMiddleware(req, res)
  await nextProxyMiddleware(req, res)
}

export default handler
