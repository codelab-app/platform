import { COMPONENT_TREE_CONTAINER } from '@codelab/frontend/abstract/core'
import {
  atomServiceContext,
  getAtomService,
} from '@codelab/frontend/modules/atom'
import { ElementService } from '@codelab/frontend/modules/element'
import { getUserService } from '@codelab/frontend/modules/user'
import {
  componentServiceContext,
  getComponentService,
  getElementService,
} from '@codelab/frontend/presenter/container'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { ComponentWhere } from '@codelab/shared/abstract/codegen'
import {
  IComponent,
  IComponentDTO,
  IComponentService,
  ICreateComponentDTO,
  IElementService,
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

@model('@codelab/ComponentService')
export class ComponentService
  extends Model({
    components: prop(() => objectMap<IComponent>()),
    // Map of component id to elementTree
    componentTrees: prop(() => objectMap<IElementService>()),
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
        const elementService = this.componentTrees.get(component.id)
        const dataNode = elementService?.elementTree?.root?.antdNode

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

    return components.map(async (component) => {
      const existingElementService = this.componentTrees.has(component.id)

      if (!existingElementService) {
        /**
         * Each component should instantiate its own element tree
         */
        const elementService = new ElementService({})

        this.componentTrees.set(component.id, elementService)

        /**
         * When creating new ElementService, it isn't attached to root tree, so this doesn't have access to context
         *
         * Need to manually set as a workaround
         */
        atomServiceContext.apply(() => elementService, getAtomService(this))
        componentServiceContext.apply(
          () => elementService,
          getComponentService(this),
        )

        const componentTree = await elementService.getTree(
          component.rootElementId,
          false,
        )
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

    const componentTree = yield* _await(
      this.elementService.getTree(component.rootElement.id, false),
    )

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
