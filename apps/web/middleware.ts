import { corsMiddleware } from '@codelab/backend/infra/adapter/middleware'
// import { RoutePaths } from '@codelab/frontend/abstract/application'
import { getEnv } from '@codelab/shared-config-env'
import { auth0Instance } from '@codelab/shared-infra-auth0/client'
import {
  type NextFetchEvent,
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server'
import { isEqual } from 'radash'

/**
 * https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
 *
 * https://github.com/auth0/nextjs-auth0/issues/1247
 *
 * https://stackoverflow.com/questions/76813923/how-to-avoid-warning-message-when-getting-user-information-on-next-js-13-server/77015385#77015385
 */

/**
 * Using `RoutePaths` may bloat the bundle size
 */
const paginatedRoutes = ['/atoms', '/tags', '/types']
const protectedRoutes = ['/apps']

const middleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent,
) => {
  const response = NextResponse.next()
  const { pathname, search } = request.nextUrl
  const authResponse = await auth0Instance.middleware(request)

  // authentication routes — let the middleware handle it
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return authResponse
  }

  const { origin } = new URL(request.url)
  const session = await auth0Instance.getSession(request)

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  )

  // user does not have a session in a protected route — redirect to login
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(`${origin}/auth/login`)
  }

  /**
   * Pagination uses query params as source of truth, we set default ones here.
   * Only apply to exact route matches to avoid unnecessary query params
   */
  if (paginatedRoutes.some((route) => pathname === route)) {
    const url = request.nextUrl.clone()
    const currentPage = url.searchParams.get('page')
    const currentPageSize = url.searchParams.get('pageSize')
    //
    const currentFilter = url.searchParams.getAll('filter')
    const newPage = currentPage ?? '1'
    const newPageSize = currentPageSize ?? '20'
    const newFilter = currentFilter.length ? currentFilter : ['name']

    url.searchParams.set('page', newPage)
    url.searchParams.set('pageSize', newPageSize)
    url.searchParams.set('filter', newFilter.join(','))

    const hasChanged =
      !isEqual(newPage, currentPage) ||
      !isEqual(newPageSize, currentPageSize) ||
      !isEqual(currentFilter, newFilter)

    if (hasChanged) {
      return NextResponse.redirect(url)
    }
  }

  /**
   * For querying the backend, we want to attach tokens from Auth0 session
   */
  if (request.nextUrl.pathname.startsWith('/api/v1')) {
    void corsMiddleware(request, response)

    // Rewrite to backend API
    const {
      endpoint: { apiHost },
    } = getEnv()

    // Keep the full path including /api/v1
    const targetUrl = new URL(`${pathname}${search}`, apiHost)
    const headers = new Headers(request.headers)

    if (session) {
      const accessToken = session.tokenSet.accessToken

      headers.set('Authorization', `Bearer ${accessToken}`)
      // headers.set('X-ID-TOKEN', session.user.idToken)
    }

    return NextResponse.rewrite(targetUrl, { headers })
  }

  return response
}

export default middleware

export const config = {
  /**
   * Match all paths to ensure middleware runs for API routes
   * Use conditional matching instead https://nextjs.org/docs/app/building-your-application/routing/middleware#conditional-statements
   */
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
