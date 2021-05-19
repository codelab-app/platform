import { ApolloClientModule, AuthModule, DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { CreateUserService } from './use-cases'
import { DeleteUserService } from './use-cases/delete-user'
import { GetMeService } from './use-cases/get-me'
import { UpdateUserService } from './use-cases/update-user'
import { UserResolver } from './user.resolver'

@Module({
  imports: [DGraphModule, AuthModule, ApolloClientModule],
  providers: [
    CreateUserService,
    UpdateUserService,
    UserResolver,
    GetMeService,
    DeleteUserService,
  ],
  exports: [],
})
export class UserModule {}
