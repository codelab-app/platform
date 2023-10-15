import { AuthGuardProductionService } from '@codelab/frontend/application/auth-guard'
import { IPageKind } from '@codelab/shared/abstract/core'
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
  const hostname = request.headers.get('host')
  const url = request.nextUrl
  const domain = url.searchParams.get('domain')
  const page = url.searchParams.get('page')

  const skipPages = [
    IPageKind.Provider,
    IPageKind.NotFound,
    IPageKind.InternalServerError,
  ].map(String)

  if (domain && page && !skipPages.includes(page)) {
    const authGuard = await AuthGuardProductionService.getAuthGuardProduction(
      domain,
      page,
    )

    if (!authGuard) {
      // Redirect to internal server error page
      url.pathname = `/${hostname}/${IPageKind.InternalServerError}`

      return NextResponse.rewrite(url)
    }

    try {
      const result = await AuthGuardProductionService.canActivate(authGuard)

      if (!result) {
        // Follow unsuccessful activation redirect

        url.pathname = `/${hostname}/${IPageKind.NotFound}`

        return NextResponse.rewrite(url)
      }
    } catch (error) {
      // Redirect to internal server error page
      url.pathname = `/${hostname}/${IPageKind.InternalServerError}`

      return NextResponse.rewrite(url)
    }
  }

  console.log('Redirecting...', url.toString())
  url.pathname = `/${hostname}${url.pathname}`

  return NextResponse.rewrite(url)
}

export default middleware
