import { Module } from '@nestjs/common'
import { UserRepository } from './repository'

@Module({
  exports: [UserRepository],
  providers: [UserRepository],
})
export class UserDomainModule {}
