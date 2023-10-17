import { Module } from '@nestjs/common'
import { AuthGuardRepository } from './repository'

@Module({
  exports: [AuthGuardRepository],
  providers: [AuthGuardRepository],
})
export class AuthGuardDomainModule {}
