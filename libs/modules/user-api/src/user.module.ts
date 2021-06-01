import { Module } from '@nestjs/common'
import {
  DeleteUserService,
  GetUserService,
  GetUsersService,
  UpdateUserService,
} from './use-cases'
import { UserResolver } from './user.resolver'

@Module({
  providers: [
    UpdateUserService,
    GetUserService,
    DeleteUserService,
    GetUsersService,
    UserResolver,
  ],
  exports: [],
})
export class UserModule {}
