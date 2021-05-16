import { DGraphModule } from '@codelab/backend'
import { Module } from '@nestjs/common'
import { UserResolver } from './application'
import { CreateUserService } from './domain/use-cases/create-user.service'

@Module({
  imports: [DGraphModule],
  providers: [CreateUserService, UserResolver],
  exports: [CreateUserService],
})
export class UserModule {}
