import { type IAuth0User } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { IAuthService } from './use-cases'
import { CurrentUser } from './user.decorator'

@Injectable()
export class AuthService extends IAuthService {
  constructor(@CurrentUser() protected user: IAuth0User) {
    super(user)
  }

  get currentUser() {
    return this.user
  }
}
