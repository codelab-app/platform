import type { IDomainStore } from '@codelab/frontend-abstract-domain'
import type { IUserDto } from '@codelab/shared-abstract-core'

import type { IApplicationStore } from './application.store.interface'

/**
 * Root store interface that combines application and domain stores.
 * User data is set via setUser method after initialization.
 */
export interface IRootStore {
  applicationStore: IApplicationStore
  domainStore: IDomainStore
  /**
   * Allows lazy initialization of user data.
   */
  setUser(user: IUserDto): void
}
