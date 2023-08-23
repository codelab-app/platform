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

const middleware = async (req: NextRequest) => {
  const hostname = req.headers.get('host')
  const url = req.nextUrl

  url.pathname = `/${hostname}${url.pathname}`

  console.log('Redirecting...', url.toString())

  return NextResponse.rewrite(url)
}

export default middleware
