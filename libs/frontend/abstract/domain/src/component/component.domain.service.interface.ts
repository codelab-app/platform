import type { IComponentDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IUpdateComponentData } from './component.dto.interface'
import type { IComponentModel } from './component.model.interface'

export interface IComponentDomainService {
  clonedComponents: ObjectMap<IComponentModel>
  componentList: Array<IComponentModel>
  components: ObjectMap<IComponentModel>
  sortedComponentsList: Array<IComponentModel>

  component(id: string): IComponentModel
  hydrate(componentDTO: IComponentDTO): IComponentModel
  removeClones(componentId: string): void
  writeCloneCache(cache: IUpdateComponentData): Array<IComponentModel>
}
