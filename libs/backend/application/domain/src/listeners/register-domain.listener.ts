import type { BeforeApplicationShutdown } from '@nestjs/common'
import type { Subscription } from 'zen-observable-ts'

import { apolloClient } from '@codelab/backend/infra/adapter/graphql'
import { Injectable } from '@nestjs/common'
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'

import type {
  DomainCreatedSubscription,
  DomainDeletedSubscription,
  DomainUpdatedSubscription,
} from '../graphql/domain.subscription.graphql.api.gen'

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
import {
  DomainCreatedDocument,
  DomainDeletedDocument,
  DomainUpdatedDocument,
} from '../graphql/domain.subscription.graphql.api.gen'

@Injectable()
export class RegisterDomainListener implements BeforeApplicationShutdown {
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent('server.ready')
  registerCreatedSubscriptions() {
    const subscription = apolloClient
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

    this.subscriptions?.push(subscription)
  }

  @OnEvent('server.ready')
  registerDeletedSubscriptions() {
    const subscription = apolloClient
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

    this.subscriptions?.push(subscription)
  }

  @OnEvent('server.ready')
  registerUpdatedSubscriptions() {
    const subscription = apolloClient
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

    this.subscriptions?.push(subscription)
  }

  beforeApplicationShutdown(signal: string) {
    this.unsubscribeFromServer()
  }

  private subscriptions?: Array<Subscription> = []

  private unsubscribeFromServer() {
    console.log('Unsubscribed from domain events')

    this.subscriptions?.forEach((subscription) => subscription.unsubscribe())
  }
}
