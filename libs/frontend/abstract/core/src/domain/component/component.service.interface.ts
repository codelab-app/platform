import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import type { IBuilderDataNode } from '../../ui'
import type {
  IComponentDTO,
  ICreateComponentData,
  IUpdateComponentData,
} from './component.dto.interface'
import type { IComponent } from './component.model.interface'

export interface IComponentService
  extends ICRUDService<IComponent, ICreateComponentData, IUpdateComponentData>,
    IQueryService<IComponent, ComponentWhere, ComponentOptions>,
    ICRUDModalService<Ref<IComponent>, { component: Maybe<IComponent> }> {
  clonedComponents: ObjectMap<IComponent>
  componentAntdNode: IBuilderDataNode
  componentList: Array<IComponent>
  components: ObjectMap<IComponent>

  add(componentDTO: IComponentDTO): IComponent
}
