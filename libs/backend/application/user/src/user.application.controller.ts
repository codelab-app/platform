import { CurrentUser } from '@codelab/backend/application/auth'
import { UserDomainService } from '@codelab/backend/domain/user'
import { type IUserDto } from '@codelab/shared/abstract/core'
import { Controller, Get, Post } from '@nestjs/common'
import * as Sentry from '@sentry/nestjs'

@Controller('user')
export class UserApplicationController {
  constructor(private readonly userDomainService: UserDomainService) {}

  @Get('/debug-sentry')
  getError() {
    Sentry.startSpan({ name: 'debug-sentry' }, () => {
      console.log('debug sentry')
    })
    // throw new Error('My first Sentry error!')
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
