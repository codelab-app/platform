import { CurrentUser } from '@codelab/backend/domain/user'
import { IAuth0User } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  getCurrentUser(@CurrentUser() user: IAuth0User) {
    return user
  }
}
