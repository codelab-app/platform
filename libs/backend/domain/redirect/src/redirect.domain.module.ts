import { Module } from '@nestjs/common'
import { RedirectRepository } from './repository'

@Module({
  exports: [RedirectRepository],
  providers: [RedirectRepository],
})
export class RedirectDomainModule {}
