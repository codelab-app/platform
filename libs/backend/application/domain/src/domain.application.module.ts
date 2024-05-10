import { Module } from '@nestjs/common'
import { DomainApplicationService } from './domain.application.service'

@Module({
  providers: [DomainApplicationService],
})
export class DomainApplicationModule {}
