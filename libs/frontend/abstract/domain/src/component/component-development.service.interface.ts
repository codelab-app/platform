import type {
  AtomDevelopmentFragment,
  ComponentDevelopmentFragment,
  ElementFragment,
  FieldFragment,
  PropFragment,
  ResourceFragment,
  StoreFragment,
  TypeFragment,
} from '@codelab/shared/abstract/codegen'
import type { IRef } from '@codelab/shared/abstract/core'
import type { IComponentModel } from './component.model.interface'

export interface IComponentDevelopmentArgs {
  componentName: string
}

export interface IComponentDevelopmentDto {
  actions: StoreFragment['actions']
  atoms: Array<AtomDevelopmentFragment>
  component: IRef
  components: Array<ComponentDevelopmentFragment>
  elements: Array<ElementFragment & { closestContainerNode: { id: string } }>
  fields: Array<FieldFragment>
  props: Array<PropFragment>
  resources: Array<ResourceFragment>
  stores: Array<StoreFragment & { component?: IRef; page?: IRef }>
  types: Array<TypeFragment>
}

export interface IComponentDevelopmentService {
  getComponentDevelopmentData(
    data: IComponentDevelopmentArgs,
  ): Promise<IComponentDevelopmentDto>
  hydrateComponentDevelopmentData(
    data: IComponentDevelopmentDto,
  ): IComponentModel
}
