import type {
  IComponent,
  IComponentService,
  ICreateComponentData,
  IUpdateComponentData,
} from '@codelab/frontend/abstract/core'
import {
  COMPONENT_NODE_TYPE,
  COMPONENT_TREE_CONTAINER,
  IBuilderDataNode,
  IComponentDTO,
} from '@codelab/frontend/abstract/core'
import { getPropService, Prop } from '@codelab/frontend/domain/prop'
import { getTypeService, typeRef } from '@codelab/frontend/domain/type'
import { getElementService } from '@codelab/frontend/presenter/container'
import { ModalService } from '@codelab/frontend/shared/utils'
import type {
  ComponentUpdateInput,
  ComponentWhere,
  InterfaceType,
  RenderedComponentFragment,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import { reconnectNodeId } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
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
      const componentModel = this.create(component)

      const { rootElement, hydratedElements } =
        this.elementService.loadComponentTree(component)

      componentModel.initTree(rootElement, hydratedElements)
    })
  }

  component(id: string) {
    return this.components.get(id) || this.clonedComponents.get(id)
  }

  @modelAction
  create({
    api,
    name,
    rootElement,
    owner,
    props,
    childrenContainerElement,
  }: IComponentDTO) {
    const apiRef = typeRef(this.typeService.addInterface(api))

    const component = new Component({
      name: name,
      rootElementId: rootElement.id,
      owner: owner,
      api: apiRef,
      props: props ? new Prop({ id: props.id, api: apiRef }) : null,
      childrenContainerElementId: childrenContainerElement.id,
    })

    if (props) {
      this.propService.add({ ...props, api: apiRef })
    }

    return component
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
      .map((component) => this.create(component))
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
  createSubmit = _async(function* (
    this: ComponentService,
    data: Array<ICreateComponentData>,
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
    const componentModel = this.create(component)

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
    { id, name, childrenContainerElementId }: IUpdateComponentData,
  ) {
    const {
      updateComponents: { components },
    } = yield* _await(
      componentApi.UpdateComponents({
        update: {
          name,
          childrenContainerElement: reconnectNodeId(childrenContainerElementId),
        },
        where: { id },
      }),
    )

    return components.map((component) => this.create(component))
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

    return components.map((component) => this.create(component))[0]!
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
        (component) => component.sourceComponentId === componentFragment.id,
      )
      .map((component) => {
        const clonedChildrenContainer =
          component.elementTree?.elements.find(
            ({ sourceElementId }) =>
              sourceElementId === componentFragment.childrenContainerElement.id,
          )

        const childrenContainerElement =
          clonedChildrenContainer ?? componentFragment.childrenContainerElement

        return this.create({
          ...componentFragment,
          childrenContainerElement,
        })
      })
  }

  @modelAction
  removeClones(componentId: string) {
    return [...this.clonedComponents.entries()]
      .filter(([_, component]) => component.sourceComponentId === componentId)
      .forEach(([elementId]) => this.clonedComponents.delete(elementId))
  }
}
