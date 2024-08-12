import { getSession } from '@auth0/nextjs-auth0'
import {
  auth0ServerInstance,
  checkExpiry,
} from '@codelab/shared-infra-auth0/server'
import { NextResponse } from 'next/server'

/**
 * https://github.com/auth0/nextjs-auth0/issues/1247
 *
 * https://stackoverflow.com/questions/76813923/how-to-avoid-warning-message-when-getting-user-information-on-next-js-13-server/77015385#77015385
 */
export default auth0ServerInstance.withMiddlewareAuthRequired({
  middleware: async (request) => {
    const response = NextResponse.next()

    await auth0ServerInstance.touchSession(request, response)

    const session = await auth0ServerInstance.getSession()
    const expired = checkExpiry(session)

    if (expired) {
      const url = request.nextUrl.clone()

      url.pathname = '/api/auth/login'

      return NextResponse.redirect(url)
    }

    // Attach headers here
    response.headers.set('Authorization', `Bearer ${session?.accessToken}`)

    // Used for request to backend APIs
    process.env.AUTHORIZATION_TOKEN = session?.accessToken

    return response
  },
})

export const config = {
  /**
   * Don't want to include `/api/auth/*`
   */
  matcher: ['/apps/:path*', '/api/v1/:path*'],
}
