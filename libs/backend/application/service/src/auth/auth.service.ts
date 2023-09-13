import { RequestContext } from '@codelab/backend/infra/adapter/request-context'
import type { Auth0IdToken } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

interface AuthenticatedRequest extends Request {
  user?: Auth0IdToken
}

@Injectable()
export class AuthService {
  get currentUser() {
    const req = RequestContext.currentContext?.req as AuthenticatedRequest
    const user = req['user']

    if (!user) {
      throw new Error('Missing user in request')
    }

    return {
      ...user,
      auth0Id: user.sub,
    }
  }
}
