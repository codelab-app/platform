import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import type { IApplicationStore } from './application.store.interface'

/**
 * Initial data to be injected into store
 */

export interface ITestStore {
  applicationStore: IApplicationStore
  domainStore: IDomainStore
}
