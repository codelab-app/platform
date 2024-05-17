import type { DomainUpdatedSubscription } from '../graphql/domain.subscription.graphql.gen'

export const DOMAIN_UPDATED_EVENT = 'domain.updated'

export class DomainUpdatedEvent {
  constructor(private subscription: DomainUpdatedSubscription) {}
}
