import type {
  IComponentDomainService,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import { IComponentDto } from '@codelab/shared/abstract/core'
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

  @computed
  get sortedComponentsList() {
    return sortBy(this.componentList, 'name')
  }

  @modelAction
  component(id: string) {
    const component = this.maybeComponent(id)

    if (!component) {
      throw new Error('Missing component')
    }

    return component
  }

  @modelAction
  hydrate(componentDto: IComponentDto) {
    let component = this.components.get(componentDto.id)

    if (component) {
      component.writeCache(componentDto)
    } else {
      component = Component.create(componentDto)

      // TODO: Renderer
      // Need to move this out of domain layer
      // this.rendererService.hydrate({
      //   elementTree: component,
      //   id: component.id,
      //   rendererType: RendererType.ComponentBuilder,
      // })

      this.components.set(component.id, component)
    }

    return component
  }

  @modelAction
  maybeComponent(id: string) {
    return this.components.get(id)
  }
}
