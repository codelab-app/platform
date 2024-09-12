import { CurrentUser } from '@codelab/backend/application/auth'
import { PreferenceDomainService } from '@codelab/backend/domain/preference'
import { UserDomainService, UserRepository } from '@codelab/backend/domain/user'
import { type IUserDto } from '@codelab/shared/abstract/core'
import { Controller, Post } from '@nestjs/common'

@Controller('user')
export class UserApplicationController {
  constructor(private readonly userDomainService: UserDomainService) {}

  /**
   *
   * @param auth0IdToken data from Auth0 session
   * @returns
   */
  @Post('save')
  async save(@CurrentUser() userDto: IUserDto) {
    return this.userDomainService.saveUser(userDto)
  }
}
