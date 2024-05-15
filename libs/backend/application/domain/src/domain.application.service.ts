import { DigitaloceanService } from '@codelab/backend/infra/adapter/digitalocean'
import { apolloClient } from '@codelab/backend/infra/adapter/graphql'
import type {
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base'
import type { Subscription } from 'zen-observable-ts'
import type { DomainCreatedSubscription } from './graphql/domain.subscription.graphql.gen'
import { DomainCreatedDocument } from './graphql/domain.subscription.graphql.gen'
import { DnsService } from '../../../infra/adapter/dns/src/dns.service'

@Injectable()
export class DomainApplicationService implements BeforeApplicationShutdown {
  constructor(
    private dnsService: DnsService,
    private digitaloceanService: DigitaloceanService,
  ) {}

  @OnEvent('server.ready')
  subscribeToServer() {
    this.subscription = apolloClient
      .subscribe<DomainCreatedSubscription>({
        query: DomainCreatedDocument,
      })
      .subscribe({
        complete: () => {
          console.log('Subscription complete')
        },
        error: (err) => {
          console.error('Error subscribing to domain creation events:', err)
        },
        next: async ({ data }) => {
          const domain = data?.domainCreated.createdDomain

          console.log('Received data:', domain)

          if (domain) {
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
        },
      })
  }

  beforeApplicationShutdown(signal: string) {
    this.unsubscribeFromServer()
  }

  private subscription?: Subscription

  private unsubscribeFromServer() {
    console.log('Unsubscribed from domain events')

    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
