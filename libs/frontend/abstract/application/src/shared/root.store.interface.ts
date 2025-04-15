import type { IDomainStore } from '@codelab/frontend-abstract-domain'
import type { IUserDto } from '@codelab/shared-abstract-core'

import type { IApplicationStore } from './application.store.interface'

export interface IRootStoreInput {
  user: IUserDto
}
/**
 * Initial data to be injected into store
 */
export interface IRootStore {
  applicationStore: IApplicationStore
  domainStore: IDomainStore
}
