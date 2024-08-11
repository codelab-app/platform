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
  middleware: async (req) => {
    const res = NextResponse.next()

    await auth0ServerInstance.touchSession(req, res)

    const session = await auth0ServerInstance.getSession()

    console.log(session)

    // const expired = checkExpiry(session)

    // if (expired) {
    //   const url = req.nextUrl.clone()

    //   url.pathname = '/api/auth/login'

    //   return NextResponse.redirect(url)
    // }

    // process.env.AUTHORIZATION_TOKEN = session?.accessToken

    return res
  },
})

export const config = {
  matcher: ['/apps/:path*', '/api/:path*', '/:path*'],
}
