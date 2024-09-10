import type { IDomainStore } from '@codelab/frontend/abstract/domain'
import type { IPreferenceDto, IUserDto } from '@codelab/shared/abstract/core'
import type { IRenderSideEffects } from '../renderer'
import type { IApplicationStore } from './application.store.interface'
import type { IRouterProps } from './router.service.interface'

export interface IRootStoreInput {
  user: IUserDto
  preference: IPreferenceDto
  routerProps: IRouterProps
  renderSideEffects: IRenderSideEffects
}
/**
 * Initial data to be injected into store
 */

export interface IRootStore {
  applicationStore: IApplicationStore
  domainStore: IDomainStore
}
