import { Module } from '@nestjs/common'

import { AuthDomainService } from './auth.domain.service'

@Module({
  exports: [AuthDomainService],
  providers: [AuthDomainService],
})
export class AuthDomainModule {}
