import { CurrentUser } from '@codelab/backend/application/auth'
import { UserRepository } from '@codelab/backend/domain/user'
import { IUserDto } from '@codelab/shared/abstract/core'
import { Controller, Post } from '@nestjs/common'

@Controller('data/user')
export class UserApplicationController {
  constructor(private userRepository: UserRepository) {}

  /**
   *
   * @param auth0IdToken data from Auth0 session
   * @returns
   */
  @Post('save')
  async save(@CurrentUser() userDto: IUserDto) {
    const user = await this.userRepository.save(userDto, {
      auth0Id: userDto.auth0Id,
    })

    return user
  }
}
