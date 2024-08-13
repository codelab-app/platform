import { getSession } from '@auth0/nextjs-auth0'
import {
  authGuardMiddleware,
  corsMiddleware,
} from '@codelab/backend/infra/adapter/middleware'
import { getEnv } from '@codelab/shared/config'
import { assertIsDefined } from '@codelab/shared/utils'
import {
  auth0ServerInstance,
  checkExpiry,
} from '@codelab/shared-infra-auth0/server'
import {
  type NextFetchEvent,
  type NextMiddleware,
  type NextRequest,
  NextResponse,
} from 'next/server'

/**
 * https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
 *
 * https://github.com/auth0/nextjs-auth0/issues/1247
 *
 * https://stackoverflow.com/questions/76813923/how-to-avoid-warning-message-when-getting-user-information-on-next-js-13-server/77015385#77015385
 */

const middleware: NextMiddleware = async (
  request: NextRequest,
  event: NextFetchEvent,
) => {
  const response = NextResponse.next()

  if (request.nextUrl.pathname.startsWith('/apps')) {
    return authGuardMiddleware(request, response, event)
  }

  if (request.nextUrl.pathname.startsWith('/api/v1')) {
    await auth0ServerInstance.touchSession(request, response)

    const session = await auth0ServerInstance.getSession(request, response)

    void corsMiddleware(request, response)

    if (session?.accessToken) {
      response.headers.set('Authorization', `Bearer ${session.accessToken}`)

      // Used for request to backend APIs
      process.env.AUTHORIZATION_TOKEN = session.accessToken
    }

    if (session?.idToken) {
      response.headers.set('X-ID-TOKEN', session.idToken)
    }

    return response
  }

  return response
}

export default middleware

export const config = {
  /**
   * Use conditional matching instead https://nextjs.org/docs/app/building-your-application/routing/middleware#conditional-statements
   */
  // matcher: ['/apps/:path*'],
}
