import { CurrentUser } from '@codelab/backend/application/service'
import { UserRepository } from '@codelab/backend/domain/user'
import { IUserDTO } from '@codelab/shared/abstract/core'
import { Controller, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post('save')
  save(@CurrentUser() user: IUserDTO) {
    return this.userRepository.save(user, { auth0Id: user.auth0Id })
  }
}
