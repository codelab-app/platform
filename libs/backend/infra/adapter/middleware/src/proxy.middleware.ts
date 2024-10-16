import type { NextRequest, NextResponse } from 'next/server'

import { authMiddleware } from './auth.middleware'
import { corsMiddleware } from './cors.middleware'

/**
 * Proxy requests to api
 */
export const proxyMiddleware = async (
  request: NextRequest,
  response: NextResponse,
) => {
  // console.log('proxyMiddleware', getEnv().endpoint.apiHost, req.url)

  await corsMiddleware(request, response)
  await authMiddleware(request, response)

  return response
}
