import { RequestContext } from '@codelab/backend/infra/adapter/request-context'
import type {
  Auth0IdToken,
  IOwner,
  IUserDTO,
} from '@codelab/shared/abstract/core'
import { IRole, JWT_CLAIMS } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'

interface AuthenticatedRequest extends Request {
  user?: Auth0IdToken
}

@Injectable()
export class AuthService {
  get currentUser(): IUserDTO {
    const req = RequestContext.currentContext?.req as AuthenticatedRequest
    const user = req['user']

    console.log(user)

    if (!user) {
      throw new Error('Missing user in request')
    }

    return {
      auth0Id: user.sub,
      email: user.email,
      id: user[JWT_CLAIMS].neo4j_user_id,
      roles: user[JWT_CLAIMS].roles.map((role) => IRole[role]),
      username: user.nickname,
    }
  }
}
