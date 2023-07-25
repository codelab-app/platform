import { UserRepository } from '@codelab/backend/domain/user'
import { ICreateUserDTO } from '@codelab/shared/abstract/core'
import { Body, Controller, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post('save')
  save(@Body() createUserDTO: ICreateUserDTO) {
    return this.userRepository.save(createUserDTO)
  }
}
