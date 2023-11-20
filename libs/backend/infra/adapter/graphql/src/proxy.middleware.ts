import { getEnv } from '@codelab/shared/config'
import type { NextApiHandler } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'
import { authMiddleware } from './auth.middleware'
import { corsMiddleware } from './cors.middleware'

/**
 * Proxy requests to platform api
 */
export const proxyMiddleware: NextApiHandler = async (req, res) => {
  console.log('before corsMiddleware')
  await corsMiddleware(req, res)
  console.log('before authMiddleware')
  await authMiddleware(req, res)
  console.log('before httpProxyMiddleware')
  await httpProxyMiddleware(req, res, {
    target: getEnv().endpoint.platformApiHost,
  })
}
