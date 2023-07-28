import { CurrentUser } from '@codelab/backend/application/service'
import { type IAuth0User } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  getCurrentUser(@CurrentUser() user: IAuth0User) {
    return user
  }
}
