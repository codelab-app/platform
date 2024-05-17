import type { DomainCreatedSubscription } from '@codelab/shared/abstract/codegen'

export const DOMAIN_CREATED_EVENT = 'domain.created'

export class DomainCreatedEvent {
  constructor(private subscription: DomainCreatedSubscription) {}
}
