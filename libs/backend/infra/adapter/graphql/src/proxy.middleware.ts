import { getEnv } from '@codelab/shared/config'
import type { NextApiHandler } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'
import { authMiddleware } from './auth.middleware'
import { corsMiddleware } from './cors.middleware'

/**
 * Proxy requests to platform api
 */
export const proxyMiddleware: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res)
  await authMiddleware(req, res)
  await httpProxyMiddleware(req, res, {
    target: getEnv().endpoint.platformApiHost,
  })
}
