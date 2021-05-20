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
    GetUserService,
    DeleteUserService,
    GetUsersService,
    UserResolver,
  ],
  exports: [],
})
export class UserModule {}
