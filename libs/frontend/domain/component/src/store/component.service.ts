import type {
  IBuilderDataNode,
  IComponent,
  IComponentDTO,
  IComponentService,
  ICreateComponentDTO,
  IUpdateComponentDTO,
} from '@codelab/frontend/abstract/core'
import {
  COMPONENT_NODE_TYPE,
  COMPONENT_TREE_CONTAINER,
} from '@codelab/frontend/abstract/core'
import { getElementService } from '@codelab/frontend/presenter/container'
import { ModalService } from '@codelab/frontend/shared/utils'
import {
  ComponentWhere,
  RenderedComponentFragment,
} from '@codelab/shared/abstract/codegen'
import { IEntity } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
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

  loadRenderedComponentTree(
    renderedComponentFragment: RenderedComponentFragment,
  ) {
    const componentModel = this.writeCache(renderedComponentFragment)

    const { rootElement, hydratedElements } =
      this.elementService.loadComponentTree(renderedComponentFragment)

    componentModel.initTree(rootElement, hydratedElements)

    return componentModel
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
        const dataNode = elementTree.root?.antdNode

        return {
          key: component.id,
          title: component.name,
          type: COMPONENT_NODE_TYPE,
          // This should bring up a meta pane for editing the component
          selectable: true,
          children: [dataNode].filter((data): data is IBuilderDataNode =>
            Boolean(data),
          ),
          rootKey: elementTree.root?.id ?? null,
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
    { name }: IUpdateComponentDTO,
  ) {
    const {
      updateComponents: { components },
    } = yield* _await(
      componentApi.UpdateComponents({
        update: { name },
        where: { id: existingComponent.id },
      }),
    )

    return components.map((component) => this.writeCache(component))
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ComponentService, ids: Array<string>) {
    ids.forEach((id) => this.components.delete(id))

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

  @modelAction
  writeCache(componentFragment: IComponentDTO) {
    let componentModel = this.component(componentFragment.id)

    if (componentModel) {
      componentModel.writeCache(componentFragment)
    } else {
      componentModel = Component.hydrate(componentFragment)
      this.components.set(componentModel.id, componentModel)
    }

    return componentModel
  }
}
