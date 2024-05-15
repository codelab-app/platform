import { DomainDomainModule } from '@codelab/backend/domain/domain'
import { DigitaloceanModule } from '@codelab/backend/infra/adapter/digitalocean'
import { DnsService } from '@codelab/backend/infra/adapter/dns'
import { Module } from '@nestjs/common'
import { DomainApplicationService } from './domain.application.service'

@Module({
  exports: [DigitaloceanModule, DomainDomainModule],
  imports: [DigitaloceanModule, DomainDomainModule],
  providers: [DomainApplicationService, DnsService],
})
export class DomainApplicationModule {}
