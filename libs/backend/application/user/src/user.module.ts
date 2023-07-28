import { UserDomainModule, UserRepository } from '@codelab/backend/domain/user'
import { Module } from '@nestjs/common'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  exports: [],
  imports: [UserDomainModule],
  providers: [],
})
export class UserModule {}
