import { DomainDomainModule } from '@codelab/backend/domain/domain'
import { DigitaloceanModule } from '@codelab/backend/infra/adapter/digitalocean'
import { Module } from '@nestjs/common'
import { DomainApplicationService } from './domain.application.service'
import { DnsService } from './services/dns.service'

@Module({
  exports: [DigitaloceanModule, DomainDomainModule],
  imports: [DigitaloceanModule, DomainDomainModule],
  providers: [DomainApplicationService, DnsService],
})
export class DomainApplicationModule {}
