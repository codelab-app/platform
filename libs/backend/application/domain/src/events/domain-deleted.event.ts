import type { DomainDeletedSubscription } from '@codelab/shared-domain-module/domain'

export const DOMAIN_DELETED_EVENT = 'domain.deleted'

export class DomainDeletedEvent {
  constructor(private subscription: DomainDeletedSubscription) {}
}
