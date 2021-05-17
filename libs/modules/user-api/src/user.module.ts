import { AuthModule, DGraphModule, GqlAuthGuard } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { CreateUserService } from './use-cases'
import { UserResolver } from './user.resolver'

@Module({
  imports: [DGraphModule, AuthModule],
  providers: [CreateUserService, UserResolver, GqlAuthGuard],
  exports: [],
})
export class UserModule {}
