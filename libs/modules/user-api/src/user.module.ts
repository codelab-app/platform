import { DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { CreateUserService } from './use-cases'
import { UserResolver } from './user.resolver'

@Module({
  imports: [DGraphModule],
  providers: [CreateUserService, UserResolver],
  exports: [],
})
export class UserModule {}
