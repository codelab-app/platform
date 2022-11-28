import {
  ComponentOptions,
  ComponentUpdateInput,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import { IBuilderDataNode } from '../../ui'
import {
  IComponentDTO,
  ICreateComponentDTO,
  IUpdateComponentDTO,
} from './component.dto.interface'
import { IComponent } from './component.model.interface'
import { RenderedComponentFragment } from './component-render.fragment.graphql.gen'

export interface IComponentService
  extends ICRUDService<IComponent, ICreateComponentDTO, IUpdateComponentDTO>,
    IQueryService<IComponent, ComponentWhere, ComponentOptions>,
    ICRUDModalService<Ref<IComponent>, { component: Maybe<IComponent> }>,
    ICacheService<IComponentDTO, IComponent> {
  components: ObjectMap<IComponent>
  component(id: string): Maybe<IComponent>
  componentAntdNode: IBuilderDataNode
  patchComponent(
    component: IComponent,
    input: ComponentUpdateInput,
  ): Promise<IComponent>
  /**
term: Rendered. Everything with these terms requires to load dependencies of elementTree to be functional:
component
  rootElement
    decendantElements
   */
  loadRenderedComponentTree(
    renderedComponentFragment: RenderedComponentFragment,
  ): void
}
