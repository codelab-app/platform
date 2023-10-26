import type {
  IComponentDomainService,
  IComponentModel,
} from '@codelab/frontend/abstract/domain'
import { IUpdateComponentData } from '@codelab/frontend/abstract/domain'
import { IComponentDTO } from '@codelab/shared/abstract/core'
import sortBy from 'lodash/sortBy'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Component } from './store'

@model('@codelab/ComponentDomainService')
export class ComponentDomainService
  extends Model({
    clonedComponents: prop(() => objectMap<IComponentModel>()),
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
    return this.components.get(id) || this.clonedComponents.get(id)
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
  removeClones(componentId: string) {
    return [...this.clonedComponents.entries()]
      .filter(([_, component]) => component.sourceComponent?.id === componentId)
      .forEach(([elementId]) => this.clonedComponents.delete(elementId))
  }

  @computed
  get sortedComponentsList() {
    return sortBy(this.componentList, 'name')
  }

  @modelAction
  writeCloneCache({
    childrenContainerElement,
    id,
    name,
  }: IUpdateComponentData) {
    return [...this.clonedComponents.values()]
      .filter((componentClone) => componentClone.sourceComponent?.id === id)
      .map((clone) => {
        const containerClone = clone.elements.find(
          ({ sourceElement }) =>
            sourceElement?.id === childrenContainerElement.id,
        )

        return clone.writeCache({
          childrenContainerElement: containerClone,
          name,
        })
      })
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
