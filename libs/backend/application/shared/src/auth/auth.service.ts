import { RequestContext } from '@codelab/backend/infra/adapter/request-context'
import {
  type Auth0IdToken,
  type IOwner,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'

interface AuthenticatedRequest extends Request {
  user?: Auth0IdToken
}

@Injectable()
export class AuthService {
  get currentUser(): IEntity {
    const req = RequestContext.currentContext?.req as AuthenticatedRequest
    const user = req['user']

    if (!user) {
      throw new Error('Missing user in request')
    }

    const userId = user[JWT_CLAIMS].neo4j_user_id

    return {
      id: userId,
    }
  }
}
