import type { DomainCreatedSubscription } from '@codelab/shared-domain-module/domain'

export const DOMAIN_CREATED_EVENT = 'domain.created'

export class DomainCreatedEvent {
  constructor(private subscription: DomainCreatedSubscription) {}
}
