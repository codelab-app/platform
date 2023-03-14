import type {
  IComponent,
  IComponentService,
  ICreateComponentData,
  IUpdateComponentData,
} from '@codelab/frontend/abstract/core'
import {
  COMPONENT_TREE_CONTAINER,
  getElementService,
  IBuilderDataNode,
  IComponentDTO,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getTypeService, InterfaceType } from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import type {
  ComponentWhere,
  RenderedComponentFragment,
} from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
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
import { v4 } from 'uuid'
import { ComponentRepository } from '../services/component.repo'
import { Component } from './component.model'
import { ComponentModalService } from './component-modal.service'

/**
 * Component service will use ref from ElementService
 */
@model('@codelab/ComponentService')
export class ComponentService
  extends Model({
    clonedComponents: prop(() => objectMap<IComponent>()),
    componentRepository: prop(() => new ComponentRepository({})),
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

      const { hydratedElements, rootElement } =
        this.elementService.loadComponentTree(component)

      componentModel.initTree(rootElement, hydratedElements)
    })
  }

  component(id: string) {
    return this.components.get(id) || this.clonedComponents.get(id)
  }

  @modelAction
  add({
    api,
    childrenContainerElement,
    id,
    name,
    owner,
    props,
    rootElement,
  }: IComponentDTO) {
    if (props) {
      this.propService.add({ ...props, data: '{}' })
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
        const dataNode = elementTree.root?.antdNode

        return {
          children: [dataNode].filter((data): data is IBuilderDataNode =>
            Boolean(data),
          ),
          key: component.id,
          node: component,
          rootKey: elementTree.root?.id ?? null,
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
  getAll = _async(function* (this: ComponentService, where: ComponentWhere) {
    const components = yield* _await(this.componentRepository.find(where))

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
    const props = this.propService.add({ data: '{}', id: v4() })

    const rootElement = this.elementService.add({
      ...createComponentData.rootElement,
      name: ROOT_ELEMENT_NAME,
      props,
    })

    const api = this.typeService.addInterface({
      ...createComponentData.api,
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${createComponentData.name}`),
      owner: createComponentData.owner,
    })

    const component = this.add({
      ...createComponentData,
      api,
      props: { id: v4() },
      rootElement,
    })

    this.components.set(component.id, component)

    const newComponent = yield* _await(this.componentRepository.add(component))

    const { hydratedElements, rootElement: loadedRootElement } =
      this.elementService.loadComponentTree(newComponent)

    component.initTree(loadedRootElement, hydratedElements)

    return component
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ComponentService,
    { childrenContainerElement, id, name }: IUpdateComponentData,
  ) {
    const component = this.components.get(id)!

    component.writeCache({ childrenContainerElement, name })

    yield* _await(this.componentRepository.update(component))

    return component!
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ComponentService, component: IComponent) {
    const { id } = component

    this.components.delete(id)
    this.removeClones(id)

    yield* _await(this.componentRepository.delete([component]))

    return component!
  })

  @modelAction
  writeClonesCache(componentFragment: IComponentDTO) {
    return [...this.clonedComponents.values()]
      .filter(
        (component) => component.sourceComponent?.id === componentFragment.id,
      )
      .map((component) => {
        const clonedChildrenContainer = component.elementTree.elements.find(
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
