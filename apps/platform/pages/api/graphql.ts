/**
 * This file is under `api` code so can import backend code
 */
import {
  authMiddleware,
  corsMiddleware,
} from '@codelab/backend/infra/adapter/graphql'
import type { NextApiHandler } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

const handler: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res)
  await authMiddleware(req, res)

  return httpProxyMiddleware(req, res, {
    pathRewrite: { '^/api/graphql': 'http://l/ocalhost:4000/graphql' },
    target: 'http://localhost:4000/graphql',
  })
}

export default await handler
