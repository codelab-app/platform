import type { NextRequest } from 'next/server'

import { corsMiddleware } from '@codelab/backend/infra/adapter/middleware'
import { getEnv } from '@codelab/shared-config-env'
import { NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!_next|fonts|examples|[\\w-]+\\.\\w+).*)',
  ],
}

const middleware = async (request: NextRequest) => {
  const response = NextResponse.next()
  const { pathname, search } = request.nextUrl
  const fullHost = request.headers.get('host') || ''
  // Remove port number if present (e.g., "demo.preview.codelab.app:3000" -> "demo.preview.codelab.app")
  const hostname = fullHost.split(':')[0]
  const url = request.nextUrl
  const domain = url.searchParams.get('domain')
  const pageUrl = `/${url.searchParams.get('page')}`
  const authorization = request.cookies.get('authorization')

  // Check if this is a subdomain that should be handled as preview
  // This includes *.codelab.test and *.preview.codelab.app
  const isPreviewDomain = hostname?.match(
    /^([a-zA-Z0-9-]+)\.(codelab\.test|preview\.codelab\.app|staging\.codelab\.app)$/,
  )

  console.log('Next url:', request.nextUrl.toString())

  /**
   * For querying the backend, we want to attach tokens from Auth0 session
   */
  if (request.nextUrl.pathname.startsWith('/api/v1')) {
    void corsMiddleware(request, response)

    // Rewrite to backend API - replace /api/v1 with the API host
    const {
      endpoint: { apiHost, baseApiPath },
    } = getEnv()

    console.log('apiHost:', apiHost)
    console.log('baseApiPath:', baseApiPath)

    const targetUrl = new URL(`${apiHost}${pathname}${search}`)
    const headers = new Headers(request.headers)

    return NextResponse.rewrite(targetUrl, { headers })
  }

  if (isPreviewDomain) {
    // Extract app ID from subdomain
    const appId = isPreviewDomain[1]

    console.log('Preview domain detected:', hostname, 'App ID:', appId)
    // Route to preview path with just the app ID
    url.pathname = `/preview/${appId}${url.pathname}`
    console.log('Rewriting to:', url.pathname)

    return NextResponse.rewrite(url)
  }

  // For all other domains (including 127.0.0.1), don't rewrite
  return NextResponse.next()
}

export default middleware
