import type {
  IComponentDomainService,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import { IComponentDTO } from '@codelab/shared/abstract/core'
import sortBy from 'lodash/sortBy'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Component } from './store'

@model('@codelab/ComponentDomainService')
export class ComponentDomainService
  extends Model({
    components: prop(() => objectMap<IComponentModel>()),
  })
  implements IComponentDomainService
{
  @computed
  get componentList() {
    return [...this.components.values()]
  }

  @modelAction
  maybeComponent(id: string) {
    return this.components.get(id)
  }

  @modelAction
  component(id: string) {
    const component = this.maybeComponent(id)

    if (!component) {
      throw new Error('Missing component')
    }

    return component
  }

  @computed
  get sortedComponentsList() {
    return sortBy(this.componentList, 'name')
  }

  @modelAction
  hydrate(componentDTO: IComponentDTO) {
    let component = this.components.get(componentDTO.id)

    if (component) {
      component.writeCache(componentDTO)
    } else {
      component = Component.create(componentDTO)

      // TODO: Need to move this out of domain layer
      // this.rendererService.hydrate({
      //   elementTree: component,
      //   id: component.id,
      //   providerTree: null,
      //   rendererType: RendererType.ComponentBuilder,
      // })

      this.components.set(component.id, component)
    }

    return component
  }
}
