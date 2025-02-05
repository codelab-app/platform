import type { IUserSession } from '@codelab/shared/abstract/core'

import { RequestContext } from '@codelab/backend/infra/adapter/request-context'
import { Injectable } from '@nestjs/common'

export interface AuthenticatedRequest extends Request {
  user?: IUserSession
}

@Injectable()
export class AuthDomainService {
  /**
   * This is made possible by RequestContext, otherwise we'll need to pass down from controller
   */
  get currentUser(): IUserSession {
    const request = RequestContext.currentContext?.req as AuthenticatedRequest
    const user = request['user']

    if (!user) {
      throw new Error('Missing user in request')
    }

    return user
  }
}
