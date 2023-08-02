import { UserRepository } from '@codelab/backend/domain/user'
import { IUserDTO } from '@codelab/shared/abstract/core'
import { Body, Controller, Get, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post('save')
  save(@Body() createUserDTO: IUserDTO) {
    return this.userRepository.save(createUserDTO)
  }
}
