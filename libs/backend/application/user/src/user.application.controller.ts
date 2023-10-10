import { AtomApplicationService } from '@codelab/backend/application/atom'
import { CurrentUser } from '@codelab/backend/application/shared'
import { AdminRepository } from '@codelab/backend/domain/admin'
import { UserRepository } from '@codelab/backend/domain/user'
import {
  type Auth0IdToken,
  IRole,
  IUserDTO,
  JWT_CLAIMS,
} from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('user')
export class UserApplicationController {
  constructor(private userRepository: UserRepository) {}

  /**
   *
   * @param auth0IdToken data from Auth0 session
   * @returns
   */
  @Post('save')
  async save(@CurrentUser() userDto: IUserDTO) {
    const user = await this.userRepository.save(userDto, {
      auth0Id: userDto.auth0Id,
    })

    return user
  }
}
