import { COMPONENT_TREE_CONTAINER } from '@codelab/frontend/abstract/core'
import { Element, elementRef } from '@codelab/frontend/modules/element'
import { getUserService } from '@codelab/frontend/modules/user'
import {
  elementServiceContext,
  getElementService,
} from '@codelab/frontend/presenter/container'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { ComponentWhere } from '@codelab/shared/abstract/codegen'
import {
  COMPONENT_NODE_TYPE,
  IBuilderDataNode,
  IComponent,
  IComponentDTO,
  IComponentService,
  ICreateComponentDTO,
  IUpdateComponentDTO,
} from '@codelab/shared/abstract/core'
import { IEntity } from '@codelab/shared/abstract/types'
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

    return yield* _await(
      Promise.all(
        components.map(async (component) => {
          const componentTree = await component.initTree(
            component.rootElementId,
          )

          /**
           * When creating new ElementService, it isn't attached to root tree, so this doesn't have access to context
           *
           * Need to manually set as a workaround
           */
          elementServiceContext.apply(
            () => componentTree,
            getElementService(this),
          )

          // Append this to rootComponentNode
          if (componentTree?.root) {
            rootElement.addChild(
              componentTree.root.id,
              elementRef(componentTree.root),
            )
          }
        }),
      ),
    )
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
          componentModel.initTree(component.rootElement.id)

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

    // const componentElements = yield* _await(
    //   this.elementService.getTree(component.rootElement.id),
    // )

    yield* _await(componentModel.initTree(component.rootElement.id))

    return [componentModel]
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ComponentService,
    component: IEntity,
    { name }: IUpdateComponentDTO,
  ) {
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

    const componentModel = Component.hydrate(updatedComponent)

    this.components.set(component.id, componentModel)

    return componentModel
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ComponentService, id: string) {
    const existing = throwIfUndefined(this.components.get(id))

    if (this.components.has(id)) {
      this.components.delete(id)
    }

    const { deleteComponents } = yield* _await(
      componentApi.DeleteComponents({
        where: { id },
        delete: {
          api: {},
        },
      }),
    )

    if (deleteComponents.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Component was not deleted')
    }

    return existing
  })

  @modelAction
  addOrUpdate(componentFragment: IComponentDTO) {
    let componentModel = this.component(componentFragment.id)

    if (componentModel) {
      componentModel.updateCache(componentFragment)
    } else {
      componentModel = Component.hydrate(componentFragment)
      this.components.set(componentModel.id, componentModel)
    }

    return componentModel
  }

  @modelAction
  updateCache(components: Array<IComponentDTO>) {
    return components.map((component) => this.addOrUpdate(component))
  }
}
