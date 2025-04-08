import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import type { IUserDto } from '@codelab/shared/abstract/core'
import type { SnapshotInOf, SnapshotOutOf } from 'mobx-keystone'

import type { IBuilderService } from '../builder'
import type { IApplicationStore } from './application.store.interface'

export interface IRootStoreInput {
  builderServiceSnapshot?: SnapshotInOf<IBuilderService>
  user: IUserDto
}
/**
 * Initial data to be injected into store
 */
export interface IRootStore {
  applicationStore: IApplicationStore
  domainStore: IDomainStore
}
