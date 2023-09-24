import { AtomApplicationService } from '@codelab/backend/application/atom'
import { AdminRepository } from '@codelab/backend/domain/admin'
import { UserRepository } from '@codelab/backend/domain/user'
import {
  type Auth0IdToken,
  IRole,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'
import { UserApplicationService } from './user.application.service'

@Controller('user')
export class UserApplicationController {
  constructor(
    private userRepository: UserRepository,
    private atomService: AtomApplicationService,
    private adminRepository: AdminRepository,
    private userService: UserApplicationService,
  ) {}

  /**
   *
   * @param auth0IdToken data from Auth0 session
   * @returns
   */
  @Post('save')
  async save(@Body() auth0IdToken: Auth0IdToken) {
    const { email, nickname: username, sub: auth0Id } = auth0IdToken
    const id = auth0IdToken[JWT_CLAIMS].neo4j_user_id
    const roles = auth0IdToken[JWT_CLAIMS].roles

    const user = await this.userRepository.save(
      {
        auth0Id,
        email,
        id,
        roles: roles.map((role) => IRole[role]),
        username,
      },
      {
        auth0Id,
      },
    )

    return user
  }

  /**
   * For dev we don't clear any data
   */
  @Post('setup-dev')
  async setup() {
    await this.userService.seedUserFromRequest()

    await this.atomService.seedReactFragment()
  }

  @Post('setup-e2e')
  async setupE2e() {
    await this.adminRepository.resetDatabase()

    await this.userService.seedUserFromRequest()

    await this.atomService.seedReactFragment()
  }
}
