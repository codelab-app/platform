import type {
  IComponentService,
  ICreateComponentDTO,
  IUpdateComponentDTO,
} from '@codelab/frontend/abstract/core'
import {
  COMPONENT_NODE_TYPE,
  COMPONENT_TREE_CONTAINER,
  IBuilderDataNode,
  IComponent,
  IComponentDTO,
  IElement,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/domain/element'
import { getElementService } from '@codelab/frontend/presenter/container'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import type {
  ComponentUpdateInput,
  ComponentWhere,
  RenderedComponentFragment,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import { reconnectNode } from '@codelab/shared/data'
import { computed } from 'mobx'
import {
  _async,
  _await,
  clone,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { mapCreateInput } from './api.utils'
import { componentApi } from './component.api'
import { Component } from './component.model'
import { ComponentModalService } from './component-modal.service'

/**
 * Component service will use ref from ElementService
 */
@model('@codelab/ComponentService')
export class ComponentService
  extends Model({
    id: idProp,
    components: prop(() => objectMap<IComponent>()),
    clonedComponents: prop(() => objectMap<IComponent>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new ComponentModalService({})),
    deleteModal: prop(() => new ComponentModalService({})),
  })
  implements IComponentService
{
  @computed
  get elementService() {
    return getElementService(this)
  }

  @computed
  get componentList() {
    return [...this.components.values()]
  }

  @modelAction
  loadRenderedComponentsTree(
    renderedComponentFragments: Array<RenderedComponentFragment>,
  ) {
    renderedComponentFragments.forEach((component) => {
      const componentModel = this.writeCache(component)

      const { rootElement, hydratedElements } =
        this.elementService.loadComponentTree(component)

      componentModel.initTree(rootElement, hydratedElements)
    })
  }

  @modelAction
  cloneComponentTree(element: IElement, component: IComponent) {
    // if instance already created
    if (this.clonedComponents.has(element.id)) {
      return throwIfUndefined(this.clonedComponents.get(element.id))
    }

    const previousRendersCount = [...this.clonedComponents.values()].filter(
      (e) => e.sourceComponentId === component.id,
    ).length

    const componentInstance: IComponent = clone<IComponent>(component)

    componentInstance.setSourceComponentId(component.id)
    componentInstance.setInstanceElement(elementRef(element.id))

    this.clonedComponents.set(element.id, componentInstance)

    componentInstance.setElementTree(
      component.cloneTree(componentInstance.id, previousRendersCount),
    )

    return componentInstance
  }

  component(id: string) {
    return this.components.get(id)
  }

  @computed
  get componentAntdNode(): IBuilderDataNode {
    return {
      key: COMPONENT_TREE_CONTAINER,
      // Container shouldn't have any type
      type: null,
      title: 'Components',
      selectable: false,
      children: [...this.components.values()].map((component) => {
        const elementTree = component.elementTree
        const dataNode = elementTree?.root?.antdNode

        return {
          key: component.id,
          title: component.name,
          type: COMPONENT_NODE_TYPE,
          // This should bring up a meta pane for editing the component
          selectable: true,
          children: [dataNode].filter((data): data is IBuilderDataNode =>
            Boolean(data),
          ),
          rootKey: elementTree?.root?.id ?? null,
        }
      }),
      rootKey: null,
    }
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ComponentService, where?: ComponentWhere) {
    const { components } = yield* _await(componentApi.GetComponents({ where }))

    return components
      .map((component) => {
        if (this.components.get(component.id)) {
          return this.components.get(component.id)
        } else {
          const componentModel = Component.hydrate(component)
          this.components.set(component.id, componentModel)
          // are used by CRUD general components
          // so not contain rendered component
          // componentModel.loadComponentTree(component)

          return componentModel
        }
      })
      .filter((component): component is Component => Boolean(component))
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ComponentService, id: string) {
    if (this.components.has(id)) {
      return this.components.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  @transaction
  create = _async(function* (
    this: ComponentService,
    data: Array<ICreateComponentDTO>,
  ) {
    const input = data.map((component) => mapCreateInput(component))

    const {
      createComponents: { components },
    } = yield* _await(
      componentApi.CreateComponents({
        input,
      }),
    )

    if (!components[0]) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Component was not created')
    }

    const component = components[0]
    const componentModel = Component.hydrate(component)

    this.components.set(component.id, componentModel)

    const { rootElement, hydratedElements } =
      this.elementService.loadComponentTree(component)

    componentModel.initTree(rootElement, hydratedElements)

    return [componentModel]
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ComponentService,
    existingComponent: IEntity,
    { name, childrenContainerElementId }: IUpdateComponentDTO,
  ) {
    const {
      updateComponents: { components },
    } = yield* _await(
      componentApi.UpdateComponents({
        update: {
          name,
          childrenContainerElement: reconnectNode(childrenContainerElementId),
        },
        where: { id: existingComponent.id },
      }),
    )

    return components.map((component) => this.writeCache(component))
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ComponentService, ids: Array<string>) {
    ids.forEach((id) => {
      this.components.delete(id)
      this.removeClones(id)
    })

    const {
      deleteComponents: { nodesDeleted },
    } = yield* _await(
      componentApi.DeleteComponents({
        where: { id_IN: ids },
        delete: {
          api: {},
        },
      }),
    )

    return nodesDeleted
  })

  @modelFlow
  @transaction
  public patchComponent = _async(function* (
    this: ComponentService,
    entity: IEntity,
    input: ComponentUpdateInput,
  ) {
    const {
      updateComponents: { components },
    } = yield* _await(
      componentApi.UpdateComponents({
        where: { id: entity.id },
        update: input,
      }),
    )

    return components.map((component) => this.writeCache(component))[0]!
  })

  @modelAction
  writeCache(componentFragment: IComponentDTO) {
    let componentModel = this.component(componentFragment.id)

    if (componentModel) {
      componentModel.writeCache(componentFragment)
      this.writeClonesCache(componentFragment)
    } else {
      componentModel = Component.hydrate(componentFragment)
      this.components.set(componentModel.id, componentModel)
    }

    return componentModel
  }

  @modelAction
  writeClonesCache(componentFragment: IComponentDTO) {
    return [...this.clonedComponents.values()]
      .filter((c) => c.sourceComponentId === componentFragment.id)
      .map((c) => c.writeCache(componentFragment))
  }

  @modelAction
  removeClones(componentId: string) {
    return [...this.clonedComponents.entries()]
      .filter(([_, component]) => component.sourceComponentId === componentId)
      .forEach(([elementId]) => this.clonedComponents.delete(elementId))
  }
}
