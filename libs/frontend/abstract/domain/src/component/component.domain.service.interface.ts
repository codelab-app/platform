import type { IComponentDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IHydrateable } from '../shared'
import type { IComponentModel } from './component.model.interface'

export interface IComponentDomainService
  extends IHydrateable<IComponentDTO, IComponentModel> {
  componentList: Array<IComponentModel>
  components: ObjectMap<IComponentModel>
  sortedComponentsList: Array<IComponentModel>

  component(id: string): IComponentModel
}
