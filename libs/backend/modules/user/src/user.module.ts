import { Module } from '@nestjs/common'
import { UserResolver } from './application/user.resolver'
import { DeleteUserService } from './use-cases/delete-user'
import { GetUserService } from './use-cases/get-user'
import { GetUsersService } from './use-cases/get-users'
import { UpdateUserService } from './use-cases/update-user'

const services = [
  /**
   * Use Cases
   */
  UpdateUserService,
  GetUserService,
  DeleteUserService,
  GetUsersService,
]

@Module({
  providers: [UserResolver, ...services],
  exports: [],
})
export class UserModule {}
