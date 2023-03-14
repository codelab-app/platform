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
import type { RenderedComponentFragment } from './component-render.fragment.graphql.gen'

export interface IComponentService
  extends ICRUDService<IComponent, ICreateComponentData, IUpdateComponentData>,
    IQueryService<IComponent, ComponentWhere, ComponentOptions>,
    ICRUDModalService<Ref<IComponent>, { component: Maybe<IComponent> }> {
  clonedComponents: ObjectMap<IComponent>
  componentAntdNode: IBuilderDataNode
  componentList: Array<IComponent>
  components: ObjectMap<IComponent>

  add(componentDTO: IComponentDTO): IComponent
  component(id: string): Maybe<IComponent>
  /**
term: Rendered. Everything with these terms requires to load dependencies of elementTree to be functional:
component
  rootElement
    descendantElements
   */
  loadRenderedComponentsTree(
    renderedComponentFragments: Array<RenderedComponentFragment>,
  ): void
}
