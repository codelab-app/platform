import { RequestContext } from '@codelab/backend/infra/adapter/request-context'
import type { Auth0IdToken, IUserDto } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { mapAuth0IdTokenToUserDto } from './user.mapper'

export interface AuthenticatedRequest extends Request {
  user?: Auth0IdToken
}

@Injectable()
export class AuthDomainService {
  get currentUser(): IUserDto {
    const request = RequestContext.currentContext?.req as AuthenticatedRequest
    const auth0IdToken = request['user']

    return mapAuth0IdTokenToUserDto(auth0IdToken)
  }
}
