import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import type { IPreferenceDto, IUserDto } from '@codelab/shared/abstract/core'
import type { IApplicationStore } from './application.store.interface'
import type { IRouterProps } from './router.service.interface'

export interface IRootStoreInput {
  preference: IPreferenceDto
  routerProps: IRouterProps
  user: IUserDto
}
/**
 * Initial data to be injected into store
 */

export interface IRootStore {
  applicationStore: IApplicationStore
  domainStore: IDomainStore
}
