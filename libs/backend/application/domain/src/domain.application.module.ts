import { DomainDomainModule } from '@codelab/backend-domain-domain'
import { DigitaloceanModule } from '@codelab/backend-infra-adapter-digitalocean'
import { DnsService } from '@codelab/backend-infra-adapter-dns'
import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'

import { DomainListener } from './listeners/domain.listener'
import { RegisterDomainListener } from './listeners/register-domain.listener'

@Module({
  exports: [DigitaloceanModule, DomainDomainModule],
  imports: [
    EventEmitterModule.forRoot(),
    DigitaloceanModule,
    DomainDomainModule,
  ],
  providers: [RegisterDomainListener, DomainListener, DnsService],
})
export class DomainApplicationModule {}
