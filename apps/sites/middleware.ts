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

  console.log('Redirecting...', url.toString())
  console.log('Hostname:', hostname)

  url.pathname = `/${hostname}${url.pathname}`

  console.log('Pathname', url.pathname)

  return NextResponse.rewrite(url)
}

export default middleware
