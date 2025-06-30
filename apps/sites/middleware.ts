import type { NextRequest } from 'next/server'

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
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
  ],
}

const middleware = async (request: NextRequest) => {
  const fullHost = request.headers.get('host') || ''
  // Remove port number if present (e.g., "demo.preview.codelab.app:3000" -> "demo.preview.codelab.app")
  const hostname = fullHost.split(':')[0]
  const url = request.nextUrl
  const domain = url.searchParams.get('domain')
  const pageUrl = `/${url.searchParams.get('page')}`
  const authorization = request.cookies.get('authorization')

  // Check if this is a subdomain that should be handled as preview
  // This includes *.codelab.test and *.preview.codelab.app
  const isPreviewDomain = hostname.match(
    /^([a-zA-Z0-9-]+)\.(codelab\.test|preview\.codelab\.app|staging\.codelab\.app)$/,
  )

  if (isPreviewDomain) {
    // Extract app ID from subdomain
    const appId = isPreviewDomain[1]

    console.log('Preview domain detected:', hostname, 'App ID:', appId)
    // Route to preview path with just the app ID
    url.pathname = `/preview/${appId}${url.pathname}`
  } else {
    console.log('Production domain:', hostname)
    // Route to production path with full domain
    url.pathname = `/production/${hostname}${url.pathname}`
  }

  console.log('Rewriting to:', url.pathname)

  return NextResponse.rewrite(url)
}

export default middleware
