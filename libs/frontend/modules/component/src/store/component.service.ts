import { COMPONENT_TREE_CONTAINER } from '@codelab/frontend/abstract/core'
import { Element, ElementTree } from '@codelab/frontend/modules/element'
import { getUserService } from '@codelab/frontend/modules/user'
import {
  elementServiceContext,
  getElementService,
} from '@codelab/frontend/presenter/container'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { ComponentWhere } from '@codelab/shared/abstract/codegen'
import {
  IComponent,
  IComponentDTO,
  IComponentService,
  ICreateComponentDTO,
  IElementTree,
  IUpdateComponentDTO,
} from '@codelab/shared/abstract/core'
import { DataNode } from 'antd/lib/tree'
import { computed } from 'mobx'
import {
  _async,
  _await,
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
    components: prop(() => objectMap<IComponent>()),
    // Map of component id to elementTree
    elementTrees: prop(() => objectMap<IElementTree>()),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new ComponentModalService({})),
    deleteModal: prop(() => new ComponentModalService({})),
  })
  implements IComponentService
{
  component(id: string) {
    return this.components.get(id)
  }

  @computed
  get elementService() {
    return getElementService(this)
  }

  @computed
  get componentAntdNode() {
    return {
      id: COMPONENT_TREE_CONTAINER,
      key: COMPONENT_TREE_CONTAINER,
      title: 'Components',
      selectable: false,
      children: [...this.components.values()].map((component) => {
        const elementTree = this.elementTrees.get(component.id)
        const dataNode = elementTree?.root?.antdNode

        return {
          id: component.id,
          key: component.id,
          title: component.name,
          selectable: false,
          children: [dataNode].filter((data): data is DataNode =>
            Boolean(data),
          ),
        }
      }),
    }
  }

  @computed
  get componentAntdNodeV2() {
    return {
      id: COMPONENT_TREE_CONTAINER,
      key: COMPONENT_TREE_CONTAINER,
      title: 'Components',
      selectable: false,
      children: [...this.components.values()].map((component) => {
        const elementTree = this.elementTrees.get(component.id)
        const dataNode = elementTree?.root?.antdNode

        return {
          id: component.id,
          key: component.id,
          title: component.name,
          // This should bring up a meta pane for editing the component
          selectable: true,
          children: [dataNode].filter((data): data is DataNode =>
            Boolean(data),
          ),
        }
      }),
    }
  }

  @modelFlow
  loadComponentTrees = _async(function* (this: ComponentService) {
    const userService = getUserService(this)

    const components = yield* _await(
      this.getAll({
        owner: {
          auth0Id: userService.auth0Id,
        },
      }),
    )

    const rootElement = new Element({
      id: 'components',
      name: 'Components',
      owner: '',
    })

    return components.map(async (component) => {
      /**
       * Each component should instantiate its own element tree
       */
      const elementTree = new ElementTree({})

      this.elementTrees.set(component.id, elementTree)

      /**
       * When creating new ElementService, it isn't attached to root tree, so this doesn't have access to context
       *
       * Need to manually set as a workaround
       */
      // atomServiceContext.apply(() => elementTree, getAtomService(this))
      elementServiceContext.apply(() => elementTree, getElementService(this))
      // componentServiceContext.apply(
      //   () => elementTree,
      //   getComponentService(this),
      // )

      const componentTree = await elementTree.getTree(component.rootElementId)

      // Append this to rootComponentNode
      if (componentTree?.root) {
        rootElement.addChild(componentTree?.root)
      }
    })
  })

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

    if (!components.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Component was not created')
    }

    const component = components[0]
    const componentModel = Component.hydrate(component)

    this.components.set(component.id, componentModel)

    // const componentTree = yield* _await(
    //   this.elementService.getTree(component.rootElement.id),
    // )

    // this.componentTrees.set(component.id, componentTree)

    return [componentModel]
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ComponentService,
    component: Component,
    { name }: IUpdateComponentDTO,
  ) {
    component.setName(name)

    const { updateComponents } = yield* _await(
      componentApi.UpdateComponents({
        update: { name },
        where: { id: component.id },
      }),
    )

    const updatedComponent = updateComponents?.components[0]

    if (!component) {
      throw new Error('Failed to update component')
    }

    component.setName(updatedComponent.name)

    return component
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ComponentService, id: string) {
    const existing = throwIfUndefined(this.components.get(id))

    if (this.components.has(id)) {
      this.components.delete(id)
    }

    const { deleteComponents } = yield* _await(
      componentApi.DeleteComponents({ where: { id } }),
    )

    if (deleteComponents.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Component was not deleted')
    }

    return existing
  })

  @modelAction
  updateCache(componentFragment: IComponentDTO) {
    const existing = this.component(componentFragment.id)

    if (existing) {
      existing.updateCache(componentFragment)
    } else {
      const component = Component.hydrate(componentFragment)
      this.components.set(component.id, component)
    }
  }

  @modelAction
  updateCaches(components: Array<IComponentDTO>) {
    for (const component of components) {
      this.updateCache(component)
    }
  }
}
