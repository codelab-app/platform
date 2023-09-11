import { type IAuth0User } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { CurrentUser } from './user.decorator'

@Injectable()
export class AuthService {
  constructor(@CurrentUser() protected user: IAuth0User) {}

  get currentUser() {
    return this.user
  }
}
