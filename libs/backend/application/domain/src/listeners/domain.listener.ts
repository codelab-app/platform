import { DigitaloceanService } from '@codelab/backend/infra/adapter/digitalocean'
import { DnsService } from '@codelab/backend/infra/adapter/dns'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { DOMAIN_CREATED_EVENT } from '../events/domain-created.event'
import { DOMAIN_DELETED_EVENT } from '../events/domain-deleted.event'
import { DOMAIN_UPDATED_EVENT } from '../events/domain-updated.event'
import {
  DomainCreatedSubscription,
  DomainDeletedSubscription,
  DomainUpdatedSubscription,
} from '../graphql/domain.subscription.graphql.gen'

@Injectable()
export class DomainListener {
  constructor(
    private dnsService: DnsService,
    private digitaloceanService: DigitaloceanService,
  ) {}

  @OnEvent(DOMAIN_CREATED_EVENT)
  async domainCreated(subscription: DomainCreatedSubscription) {
    const domain = subscription.domainCreated.createdDomain

    try {
      const records = await this.dnsService.lookupARecord(domain.name)

      console.log(records)
    } catch (error) {
      console.log(error)
    }

    // If records contain the sites ip address, meaning the user has ownership, then we add the domain to DO
    // try {
    //   await this.digitaloceanService.createDomain(domain.name)
    // } catch (error) {
    //   console.log(error)
    // }
  }

  @OnEvent(DOMAIN_DELETED_EVENT)
  async domainDeleted(subscription: DomainDeletedSubscription) {}

  @OnEvent(DOMAIN_UPDATED_EVENT)
  async domainUpdated(subscription: DomainUpdatedSubscription) {}
}
