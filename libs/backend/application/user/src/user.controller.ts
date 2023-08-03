import { CurrentUser } from '@codelab/backend/application/service'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { Auth0SessionUser, IUserDTO } from '@codelab/shared/abstract/core'
import { Body, Controller, Get, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  index() {
    return 'hi'
  }

  @Post('save')
  save(@CurrentUser() user: IUserDTO) {
    return this.userRepository.save(user)
  }
}
