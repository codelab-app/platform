import { apolloClient } from '@codelab/backend/infra/adapter/graphql'
import type { BeforeApplicationShutdown } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'
import type { Subscription } from 'zen-observable-ts'
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
import type {
  DomainCreatedSubscription,
  DomainDeletedSubscription,
  DomainUpdatedSubscription,
} from '../graphql/domain.subscription.graphql.gen'
import {
  DomainCreatedDocument,
  DomainDeletedDocument,
  DomainUpdatedDocument,
} from '../graphql/domain.subscription.graphql.gen'

@Injectable()
export class RegisterDomainListener implements BeforeApplicationShutdown {
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent('server.ready')
  registerCreatedSubscriptions() {
    this.subscription = apolloClient
      .subscribe<DomainCreatedSubscription>({
        query: DomainCreatedDocument,
      })
      .subscribe({
        next: async ({ data }) => {
          if (!data) {
            throw new Error('Invalid subscription data')
          }

          this.eventEmitter.emit(
            DOMAIN_CREATED_EVENT,
            new DomainCreatedEvent(data),
          )
        },
      })
  }

  @OnEvent('server.ready')
  registerDeletedSubscriptions() {
    this.subscription = apolloClient
      .subscribe<DomainDeletedSubscription>({
        query: DomainDeletedDocument,
      })
      .subscribe({
        next: async ({ data }) => {
          if (!data) {
            throw new Error('Invalid subscription data')
          }

          this.eventEmitter.emit(
            DOMAIN_DELETED_EVENT,
            new DomainDeletedEvent(data),
          )
        },
      })
  }

  @OnEvent('server.ready')
  registerUpdatedSubscriptions() {
    this.subscription = apolloClient
      .subscribe<DomainUpdatedSubscription>({
        query: DomainUpdatedDocument,
      })
      .subscribe({
        next: async ({ data }) => {
          if (!data) {
            throw new Error('Invalid subscription data')
          }

          this.eventEmitter.emit(
            DOMAIN_UPDATED_EVENT,
            new DomainUpdatedEvent(data),
          )
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
