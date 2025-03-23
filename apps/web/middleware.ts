import { corsMiddleware } from '@codelab/backend/infra/adapter/middleware'
import { PageType } from '@codelab/frontend/abstract/application'
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

// Convert arrays to Sets for O(1) lookups instead of O(n) array searches
const paginatedRouteSet = new Set([
  PageType.Atoms(),
  PageType.Tags(),
  PageType.Type(),
])

const protectedRouteSet = new Set([PageType.AppList()])

const middleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent,
) => {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname
  const { origin } = new URL(request.url)

  // Fast path for API routes - skip auth0 calls for performance
  if (pathname.startsWith('/api/v1')) {
    void corsMiddleware(request, response)

    // Only get session if we need it for API routes
    const session = await auth0Instance.getSession()

    if (session) {
      const accessToken = session.tokenSet.accessToken

      response.headers.set('Authorization', `Bearer ${accessToken}`)
    }

    return response
  }

  // Handle auth routes early to avoid unnecessary processing
  if (pathname.startsWith('/auth')) {
    return auth0Instance.middleware(request)
  }

  // Check if it's a protected route before getting session
  const isProtectedRoute = checkProtectedRoute(pathname)

  // Only get session if needed for protected routes
  if (isProtectedRoute) {
    const session = await auth0Instance.getSession()

    if (!session) {
      return NextResponse.redirect(`${origin}/auth/login`)
    }
  }

  // Handle pagination routes with efficient checks
  if (isPaginatedRoute(pathname)) {
    const url = request.nextUrl.clone()
    const currentPage = url.searchParams.get('page')
    const currentPageSize = url.searchParams.get('pageSize')
    const currentFilter = url.searchParams.getAll('filter')
    const newPage = currentPage ?? '1'
    const newPageSize = currentPageSize ?? '20'
    const newFilter = currentFilter.length ? currentFilter : ['name']

    // Only modify URL if values would actually change
    if (
      currentPage !== newPage ||
      currentPageSize !== newPageSize ||
      currentFilter.length === 0
    ) {
      url.searchParams.set('page', newPage)
      url.searchParams.set('pageSize', newPageSize)
      url.searchParams.set('filter', newFilter.join(','))

      return NextResponse.redirect(url)
    }
  }

  return response
}

// Helper functions for efficient route checking
const isPaginatedRoute = (pathname: string): boolean => {
  for (const route of paginatedRouteSet) {
    if (pathname.startsWith(route)) {
      return true
    }
  }

  return false
}

const checkProtectedRoute = (pathname: string): boolean => {
  for (const route of protectedRouteSet) {
    if (pathname.startsWith(route)) {
      return true
    }
  }

  return false
}

export default middleware

export const config = {
  // Only run middleware on the specific routes that need it
  matcher: [
    '/auth/:path*',
    '/api/v1/:path*',
    '/atoms/:path*',
    '/tags/:path*',
    '/type/:path*',
    '/apps/:path*',
  ],
}
