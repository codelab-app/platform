import type {
  IComponentDto,
  ICreateComponentData,
} from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IHydrateable } from '../shared'
import type { IComponentModel } from './component.model.interface'

export interface IComponentDomainService
  extends IHydrateable<IComponentDto, IComponentModel> {
  componentList: Array<IComponentModel>
  components: ObjectMap<IComponentModel>
  sortedComponentsList: Array<IComponentModel>

  add(data: ICreateComponentData): IComponentModel
  component(id: string): IComponentModel
  findBySlug(slug: string): IComponentModel
}
