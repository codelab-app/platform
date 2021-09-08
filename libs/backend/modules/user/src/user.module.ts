import { Module } from '@nestjs/common'
import { UserResolver } from './application/user.resolver'
import { UserAdapter } from './domain/user.adapter'
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
  /**
   * Adapters
   */
  UserAdapter,
]

@Module({
  providers: [UserResolver, ...services],
  exports: [...services],
})
export class UserModule {}
