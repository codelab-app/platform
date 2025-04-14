import type { BeforeApplicationShutdown } from '@nestjs/common'
import type { Subscription } from 'zen-observable-ts'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { nodeApolloClient } from '@codelab/shared/infra/gql-client'
import {
  DomainCreatedDocument,
  DomainCreatedSubscription,
  DomainDeletedDocument,
  DomainDeletedSubscription,
  DomainUpdatedDocument,
  DomainUpdatedSubscription,
} from '@codelab/shared-domain-module/domain'
import { Injectable } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'

import {
  DOMAIN_CREATED_EVENT,
  DomainCreatedEvent,
} from '../events/domain-created.event'
import {
  DOMAIN_DELETED_EVENT,
  DomainDeletedEvent,
} from '../events/domain-deleted.event'
import {
  DOMAIN_UPDATED_EVENT,
  DomainUpdatedEvent,
} from '../events/domain-updated.event'

@Injectable()
export class RegisterDomainListener implements BeforeApplicationShutdown {
  constructor(
    private eventEmitter: EventEmitter2,
    private logger: PinoLoggerService,
  ) {}

  beforeApplicationShutdown(signal: string) {
    this.unsubscribeFromServer()
  }

  @OnEvent('server.ready')
  registerCreatedSubscriptions() {
    const subscription = nodeApolloClient()
      .subscribe<DomainCreatedSubscription>({
        query: DomainCreatedDocument,
      })
      .subscribe({
        next: async ({ data }) => {
          this.logger.log('Domain Created Event received', {
            context: 'RegisterDomainListener',
            data,
          })

          if (!data) {
            throw new Error('Invalid subscription data')
          }

          this.eventEmitter.emit(
            DOMAIN_CREATED_EVENT,
            new DomainCreatedEvent(data),
          )
        },
      })

    this.subscriptions?.push(subscription)
  }

  @OnEvent('server.ready')
  registerDeletedSubscriptions() {
    const subscription = nodeApolloClient()
      .subscribe<DomainDeletedSubscription>({
        query: DomainDeletedDocument,
      })
      .subscribe({
        next: async ({ data }) => {
          this.logger.log('Domain Deleted Event received', {
            context: 'RegisterDomainListener',
            data,
          })

          if (!data) {
            throw new Error('Invalid subscription data')
          }

          this.eventEmitter.emit(
            DOMAIN_DELETED_EVENT,
            new DomainDeletedEvent(data),
          )
        },
      })

    this.subscriptions?.push(subscription)
  }

  @OnEvent('server.ready')
  registerUpdatedSubscriptions() {
    const subscription = nodeApolloClient()
      .subscribe<DomainUpdatedSubscription>({
        query: DomainUpdatedDocument,
      })
      .subscribe({
        next: async ({ data }) => {
          this.logger.log('Domain Updated Event received', {
            context: 'RegisterDomainListener',
            data,
          })

          if (!data) {
            throw new Error('Invalid subscription data')
          }

          this.eventEmitter.emit(
            DOMAIN_UPDATED_EVENT,
            new DomainUpdatedEvent(data),
          )
        },
      })

    this.subscriptions?.push(subscription)
  }

  private subscriptions?: Array<Subscription> = []

  private unsubscribeFromServer() {
    this.logger.log('Unsubscribed from domain events', {
      context: 'RegisterDomainListener',
    })

    this.subscriptions?.forEach((subscription) => subscription.unsubscribe())
  }
}
