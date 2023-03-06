import type {
  IComponent,
  IComponentService,
  ICreateComponentData,
  IUpdateComponentData,
} from '@codelab/frontend/abstract/core'
import {
  COMPONENT_TREE_CONTAINER,
  componentRef,
  getElementService,
  IBuilderDataNode,
  IComponentDTO,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getTypeService } from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import type {
  ComponentUpdateInput,
  ComponentWhere,
  RenderedComponentFragment,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import { reconnectNodeId } from '@codelab/shared/domain/mapper'
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
    clonedComponents: prop(() => objectMap<IComponent>()),
    components: prop(() => objectMap<IComponent>()),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new ComponentModalService({})),
    id: idProp,
    updateModal: prop(() => new ComponentModalService({})),
  })
  implements IComponentService
{
  @computed
  get elementService() {
    return getElementService(this)
  }

  @computed
  get typeService() {
    return getTypeService(this)
  }

  @computed
  get propService() {
    return getPropService(this)
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
      const componentModel = this.add(component)

      const { rootElement, hydratedElements } =
        this.elementService.loadComponentTree(component)

      componentModel.initTree(rootElement, hydratedElements)
    })
  }

  component(id: string) {
    return this.components.get(id) || this.clonedComponents.get(id)
  }

  @modelAction
  add({
    id,
    api,
    name,
    rootElement,
    owner,
    props,
    childrenContainerElement,
  }: IComponentDTO) {
    if (props) {
      this.propService.add(props)
    }

    const component = Component.create({
      api,
      childrenContainerElement,
      id,
      name,
      owner,
      props,
      rootElement,
    })

    this.components.set(component.id, component)

    return component
  }

  @computed
  get componentAntdNode(): IBuilderDataNode {
    return {
      children: [...this.components.values()].map((component) => {
        const elementTree = component.elementTree
        const dataNode = elementTree?.root?.antdNode

        return {
          children: [dataNode].filter((data): data is IBuilderDataNode =>
            Boolean(data),
          ),
          key: component.id,
          node: componentRef(component.id),

          rootKey: elementTree?.root?.id ?? null,
          // This should bring up a meta pane for editing the component
          selectable: true,
          title: component.name,
        }
      }),
      key: COMPONENT_TREE_CONTAINER,
      // Container shouldn't have any type
      node: null,
      rootKey: null,
      selectable: false,
      title: 'Components',
    }
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: ComponentService, where?: ComponentWhere) {
    const { components } = yield* _await(componentApi.GetComponents({ where }))

    return components
      .map((component) => this.add(component))
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
    createComponentData: ICreateComponentData,
  ) {
    const input = mapCreateInput(createComponentData)

    const {
      createComponents: {
        components: [component],
      },
    } = yield* _await(
      componentApi.CreateComponents({
        input,
      }),
    )

    if (!component) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Component was not created')
    }

    const componentModel = this.add(component)

    this.components.set(component.id, componentModel)

    const { rootElement, hydratedElements } =
      this.elementService.loadComponentTree(component)

    componentModel.initTree(rootElement, hydratedElements)

    return componentModel
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ComponentService,
    { id, name, childrenContainerElement }: IUpdateComponentData,
  ) {
    const component = this.components.get(id)

    component?.writeCache({ childrenContainerElement, name })

    const {
      updateComponents: { components },
    } = yield* _await(
      componentApi.UpdateComponents({
        update: {
          childrenContainerElement: reconnectNodeId(
            childrenContainerElement.id,
          ),
          name,
        },
        where: { id },
      }),
    )

    return component!
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ComponentService, component: IComponent) {
    const { id } = component

    this.components.delete(id)
    this.removeClones(id)

    const {
      deleteComponents: { nodesDeleted },
    } = yield* _await(
      componentApi.DeleteComponents({
        delete: {
          api: {},
        },
        where: { id },
      }),
    )

    return component!
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
        update: input,
        where: { id: entity.id },
      }),
    )

    return components.map((component) => this.add(component))[0]!
  })

  // @modelAction
  // add(componentFragment: IComponentDTO) {
  //   let componentModel = this.component(componentFragment.id)

  //   if (componentModel) {
  //     componentModel.add(componentFragment)
  //     this.writeClonesCache(componentFragment)
  //   } else {
  //     componentModel = Component.hydrate(componentFragment)
  //     this.components.set(componentModel.id, componentModel)
  //   }

  //   return componentModel
  // }

  @modelAction
  writeClonesCache(componentFragment: IComponentDTO) {
    return [...this.clonedComponents.values()]
      .filter(
        (component) => component.sourceComponent?.id === componentFragment.id,
      )
      .map((component) => {
        const clonedChildrenContainer = component.elementTree?.elements.find(
          ({ sourceElement }) =>
            sourceElement?.id === componentFragment.childrenContainerElement.id,
        )

        const childrenContainerElement =
          clonedChildrenContainer ?? componentFragment.childrenContainerElement

        return this.add({
          ...componentFragment,
          childrenContainerElement,
        })
      })
  }

  @modelAction
  removeClones(componentId: string) {
    return [...this.clonedComponents.entries()]
      .filter(([_, component]) => component.sourceComponent?.id === componentId)
      .forEach(([elementId]) => this.clonedComponents.delete(elementId))
  }
}
