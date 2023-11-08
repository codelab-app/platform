import type { IResourceDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IHydrateable } from '../shared'
import type { IResourceModel } from './resource.model.interface'

export interface IResourceDomainService
  extends IHydrateable<IResourceDTO, IResourceModel> {
  resources: ObjectMap<IResourceModel>
}
