import {
  authMiddleware,
  corsMiddleware,
} from '@codelab/backend/infra/adapter/graphql'
import { getEnv } from '@codelab/shared/config'
import type { NextApiHandler } from 'next'
import httpProxyMiddleware from 'next-http-proxy-middleware'

/**
 * Proxy requests to api
 */
export const proxyMiddleware: NextApiHandler = async (req, res) => {
  await corsMiddleware(req, res)
  await authMiddleware(req, res)

  console.log('proxyMiddleware', getEnv().endpoint.apiHost)

  await httpProxyMiddleware(req, res, {
    target: getEnv().endpoint.apiHost,
  })
}

export default proxyMiddleware

export const config = {
  maxDuration: 60,
}
