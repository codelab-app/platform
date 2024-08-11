import {
  auth0ServerInstance,
  checkExpiry,
} from '@codelab/shared-infra-auth0/server'
import { type NextRequest, NextResponse } from 'next/server'

export const authGuardMiddleware = (request: NextRequest) =>
  auth0ServerInstance.withMiddlewareAuthRequired({
    middleware: async (req: NextRequest) => {
      const res = NextResponse.next()

      await auth0ServerInstance.touchSession(req, res)

      const session = await auth0ServerInstance.getSession()

      console.log(session)

      const expired = checkExpiry(session)

      if (expired) {
        const url = req.nextUrl.clone()

        url.pathname = '/api/auth/login'

        return NextResponse.redirect(url)
      }

      process.env['AUTHORIZATION_TOKEN'] = session?.accessToken

      return res
    },
  })
