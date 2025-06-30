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
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl
  const domain = url.searchParams.get('domain')
  const pageUrl = `/${url.searchParams.get('page')}`
  const authorization = request.cookies.get('authorization')

  // Check if this is a preview subdomain
  const previewMatch = hostname.match(
    /^([a-zA-Z0-9-]+)\.preview\.codelab\.app$/,
  )

  if (previewMatch) {
    // Extract app ID from subdomain
    const appId = previewMatch[1]

    console.log('Preview request for app:', appId)

    // Rewrite to preview route with app ID
    url.pathname = `/preview/${appId}${url.pathname}`

    return NextResponse.rewrite(url)
  }

  // Check if this is a staging subdomain (alternative to preview)
  const stagingMatch = hostname.match(
    /^([a-zA-Z0-9-]+)\.staging\.codelab\.app$/,
  )

  if (stagingMatch) {
    // Extract app ID from subdomain
    const appId = stagingMatch[1]

    console.log('Staging request for app:', appId)

    // Rewrite to preview route with app ID (using same handler)
    url.pathname = `/preview/${appId}${url.pathname}`

    return NextResponse.rewrite(url)
  }

  // if (domain && pageUrl) {
  //   const endpoint = getEnv().endpoint.canActivateUrl

  //   const response = await fetch(endpoint, {
  //     body: JSON.stringify({
  //       authorization: authorization?.value,
  //       domain,
  //       pageUrl,
  //     }),
  //     headers: { 'Content-Type': 'application/json' },

  //     method: 'POST',
  //   }).then((res) => res.json())

  //   if (!response.canActivate && response.redirectUrl) {
  //     return NextResponse.redirect(response.redirectUrl)
  //   }
  // }

  // Default behavior for custom domains
  console.log('Redirecting...', url.toString())
  url.pathname = `/${hostname}${url.pathname}`

  return NextResponse.rewrite(url)
}

export default middleware
