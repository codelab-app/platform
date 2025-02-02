import type {
  DomainCreatedSubscription,
  DomainDeletedSubscription,
  DomainUpdatedSubscription,
} from '@codelab/shared-domain-module/domain'

import { DigitaloceanService } from '@codelab/backend/infra/adapter/digitalocean'
import { DnsService } from '@codelab/backend/infra/adapter/dns'
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

import { DOMAIN_CREATED_EVENT } from '../events/domain-created.event'
import { DOMAIN_DELETED_EVENT } from '../events/domain-deleted.event'
import { DOMAIN_UPDATED_EVENT } from '../events/domain-updated.event'

@Injectable()
export class DomainListener {
  constructor(
    private dnsService: DnsService,
    private digitaloceanService: DigitaloceanService,
    private readonly logger: PinoLoggerService,
  ) {}

  @OnEvent(DOMAIN_CREATED_EVENT)
  async domainCreated(subscription: DomainCreatedSubscription) {
    const domain = subscription.domainCreated.createdDomain

    this.logger.log('domainCreated', {
      context: 'DomainListener',
      data: {
        domain: domain.name,
      },
    })

    // try {
    //   const records = await this.dnsService.lookupARecord(domain.name)

    //   console.log(records)
    // } catch (error) {
    //   console.log(error)
    // }

    // If records contain the sites ip address, meaning the user has ownership, then we add the domain to DO
    // try {
    //   await this.digitaloceanService.createDomain(domain.name)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  @OnEvent(DOMAIN_DELETED_EVENT)
  async domainDeleted(subscription: DomainDeletedSubscription) {
    this.logger.log('domainDeleted', {
      context: 'DomainListener',
      data: {
        domain: subscription.domainDeleted.deletedDomain.name,
      },
    })
  }

  @OnEvent(DOMAIN_UPDATED_EVENT)
  async domainUpdated(subscription: DomainUpdatedSubscription) {
    // this.logger.log('domainUpdated', {
    //   context: 'DomainListener',
    //   data: {
    //     domain: subscription.domainUpdated.updatedDomain.name,
    //   },
    // })
  }
}
