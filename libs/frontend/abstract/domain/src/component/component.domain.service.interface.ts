import type { IComponentDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IComponentModel } from './component.model.interface'

export interface IComponentDomainService {
  componentList: Array<IComponentModel>
  components: ObjectMap<IComponentModel>
  sortedComponentsList: Array<IComponentModel>

  component(id: string): IComponentModel
  hydrate(componentDTO: IComponentDTO): IComponentModel
}
