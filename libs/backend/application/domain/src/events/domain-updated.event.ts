import type { DomainUpdatedSubscription } from '@codelab/shared-domain-module/domain'

export const DOMAIN_UPDATED_EVENT = 'domain.updated'

export class DomainUpdatedEvent {
  constructor(private subscription: DomainUpdatedSubscription) {}
}
