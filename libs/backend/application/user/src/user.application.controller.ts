import { CurrentUser } from '@codelab/backend/application/shared'
import { UserRepository } from '@codelab/backend/domain/user'
import { IUserDTO } from '@codelab/shared/abstract/core'
import { Controller, Post } from '@nestjs/common'

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
