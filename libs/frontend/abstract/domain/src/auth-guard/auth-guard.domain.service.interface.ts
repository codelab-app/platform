import type { IAuthGuardDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IHydrateable } from '../shared'
import type { IAuthGuardModel } from './auth-guard.model.interface'

export interface IAuthGuardDomainService
  extends IHydrateable<IAuthGuardDTO, IAuthGuardModel> {
  authGuards: ObjectMap<IAuthGuardModel>
}
