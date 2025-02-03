import { CurrentUser } from '@codelab/backend/application/auth'
import { UserDomainService, UserRepository } from '@codelab/backend/domain/user'
import { IUserSession, type IUserDto } from '@codelab/shared/abstract/core'
import { Controller, Get, Post } from '@nestjs/common'
import * as Sentry from '@sentry/nestjs'

@Controller('user')
export class UserApplicationController {
  constructor(
    private readonly userDomainService: UserDomainService,
    private readonly userRepository: UserRepository,
  ) {}

  @Get('/debug-sentry')
  getError() {
    Sentry.startSpan({ name: 'debug-sentry' }, () => {
      console.log('debug sentry')
    })
    // throw new Error('My first Sentry error!')
  }

  @Get('me')
  async me(@CurrentUser() userDto: IUserSession) {
    return this.userRepository.findOne({ where: { id: userDto.id } })
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
