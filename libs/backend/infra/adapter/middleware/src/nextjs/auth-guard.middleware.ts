import {
  auth0ServerInstance,
  checkExpiry,
} from '@codelab/shared-infra-auth0/server'
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server'

export const authGuardMiddleware = (
  request: NextRequest,
  response: NextResponse,
  event: NextFetchEvent,
) => {
  const middleware = auth0ServerInstance.withMiddlewareAuthRequired({
    middleware: async (req: NextRequest) => {
      await auth0ServerInstance.touchSession(req, response)

      const session = await auth0ServerInstance.getSession()
      const expired = checkExpiry(session)

      if (expired) {
        const url = req.nextUrl.clone()

        url.pathname = '/api/auth/login'

        return NextResponse.redirect(url)
      }

      return
    },
  })

  return middleware(request, event)
}
