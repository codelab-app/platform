import { ApolloClientModule, AuthModule, DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import {
  DeleteUserService,
  GetUserService,
  GetUsersService,
  UpdateUserService,
} from './use-cases'
import { UserResolver } from './user.resolver'

@Module({
  imports: [DGraphModule, AuthModule, ApolloClientModule],
  providers: [
    UpdateUserService,
    UserResolver,
    GetUserService,
    DeleteUserService,
    GetUsersService,
  ],
  exports: [],
})
export class UserModule {}
