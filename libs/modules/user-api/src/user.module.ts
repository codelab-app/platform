import { ApolloClientModule, AuthModule, DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { CreateUserService } from './use-cases'
import { UpdateUserService } from './use-cases/update-user'
import { UserResolver } from './user.resolver'

@Module({
  imports: [DGraphModule, AuthModule, ApolloClientModule],
  providers: [CreateUserService, UpdateUserService, UserResolver],
  exports: [],
})
export class UserModule {}
