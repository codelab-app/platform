import { Module } from '@nestjs/common'
import { UserResolver } from './application/user.resolver'
import { DeleteUserService } from './use-cases/delete-user'
import { GetUserService } from './use-cases/get-user'
import { GetUsersService } from './use-cases/get-users'
import { UpsertUserService } from './use-cases/upsert-user'

const services = [
  /**
   * Use Cases
   */
  UpsertUserService,
  GetUserService,
  DeleteUserService,
  GetUsersService,
]

@Module({
  providers: [UserResolver, ...services],
  exports: [...services],
})
export class UserModule {}
