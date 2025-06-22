import { CurrentUser } from '@codelab/backend-application-auth'
import { UserDomainService, UserRepository } from '@codelab/backend-domain-user'
import { type IUserDto, IUserSession } from '@codelab/shared-abstract-core'
import { Controller, Get, Post } from '@nestjs/common'

@Controller('user')
export class UserApplicationController {
  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly userRepository: UserRepository,
  ) {}

  @Get('me')
  async me(@CurrentUser() userSession: IUserSession) {
    return this.userRepository.findOne({ where: { id: userSession.id } })
  }

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
