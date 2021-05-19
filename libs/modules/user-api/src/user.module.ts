import { ApolloClientModule, AuthModule, DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import {
  CreateUserService,
  DeleteUsersService,
  GetMeService,
  GetUsersService,
  UpdateUserService,
} from './use-cases'
import { UserResolver } from './user.resolver'

@Module({
  imports: [DGraphModule, AuthModule, ApolloClientModule],
  providers: [
    CreateUserService,
    UpdateUserService,
    UserResolver,
    GetMeService,
    DeleteUsersService,
    GetUsersService,
  ],
  exports: [],
})
export class UserModule {}
