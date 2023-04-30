import type {
  IComponent,
  IComponentService,
  ICreateComponentData,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import {
  COMPONENT_TREE_CONTAINER,
  componentRef,
  getBuilderRenderService,
  getElementService,
  IBuilderDataNode,
  IComponentDTO,
  IUpdateComponentData,
  RendererType,
} from '@codelab/frontend/abstract/core'
import { getPropService } from '@codelab/frontend/domain/prop'
import { getStoreService, Store } from '@codelab/frontend/domain/store'
import {
  getTypeService,
  InterfaceType,
  typeRef,
} from '@codelab/frontend/domain/type'
import { ModalService, PaginationService } from '@codelab/frontend/shared/utils'
import type {
  ComponentOptions,
  ComponentWhere,
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
    paginationService: prop(
      () => new PaginationService<IComponent, { name?: string }>({}),
    ),
    updateModal: prop(() => new ComponentModalService({})),
  })
  implements IComponentService
{
  onAttachedToRootStore() {
    this.paginationService.getDataFn = async (page, pageSize, filter) => {
      const items = await this.getAll(
        { name_MATCHES: `(?i).*${filter.name ?? ''}.*` },
        {
          limit: pageSize,
          offset: (page - 1) * pageSize,
        },
      )

      return { items, totalItems: this.paginationService.totalItems }
    }
  }

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
  get storeService() {
    return getStoreService(this)
  }

  @computed
  get builderRenderService() {
    return getBuilderRenderService(this)
  }

  @computed
  get componentList() {
    return [...this.components.values()]
  }

  @modelAction
  add(componentDTO: IComponentDTO) {
    const component = Component.create(componentDTO)

    this.builderRenderService.addRenderer({
      elementTree: component,
      id: component.id,
      providerTree: null,
      rendererType: RendererType.ComponentBuilder,
    })

    this.components.set(component.id, component)

    return component
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: ComponentService,
    { name, owner, ...data }: ICreateComponentData,
  ) {
    const storeApi = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${name} Store`),
      owner: owner,
    })

    const store = this.storeService.add({
      api: typeRef<IInterfaceType>(storeApi.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const rootElementProps = this.propService.add({ data: '{}', id: v4() })

    const rootElement = this.elementService.add({
      ...data.rootElement,
      name,
      parentComponent: { id: data.id },
      props: rootElementProps,
    })

    const api = this.typeService.addInterface({
      ...data.api,
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(name),
      owner,
    })

    const componentProps = this.propService.add({
      data: '{}',
      id: v4(),
    })

    const component = this.add({
      ...data,
      api,
      name,
      owner,
      props: componentProps,
      rootElement,
      store,
    })

    yield* _await(this.componentRepository.add(component))

    this.paginationService.dataRefs.set(component.id, componentRef(component))

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
    this.writeCloneCache({ childrenContainerElement, id, name })

    yield* _await(this.componentRepository.update(component))

    return component
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: ComponentService, component: IComponent) {
    const { id } = component
    const store = component.store.current
    const rootElement = component.rootElement.current

    this.components.delete(id)
    this.removeClones(id)

    yield* _await(this.storeService.delete(store))
    yield* _await(this.elementService.delete(rootElement))
    yield* _await(this.componentRepository.delete([component]))

    return component
  })

  @computed
  get componentAntdNode(): IBuilderDataNode {
    return {
      children: [...this.components.values()].map((component) => {
        const dataNode = component.rootElement.current.antdNode

        return {
          children: [dataNode].filter((data): data is IBuilderDataNode =>
            Boolean(data),
          ),
          key: component.id,
          node: component,
          rootKey: component.rootElement.id,
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
  getAll = _async(function* (
    this: ComponentService,
    where: ComponentWhere = {},
    options?: ComponentOptions,
  ) {
    const { items: components } = yield* _await(
      this.componentRepository.find(where, options),
    )

    return components.map((component) => {
      this.storeService.load([component.store])

      return this.add(component)
    })
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

  @modelAction
  private writeCloneCache({
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
  private removeClones(componentId: string) {
    return [...this.clonedComponents.entries()]
      .filter(([_, component]) => component.sourceComponent?.id === componentId)
      .forEach(([elementId]) => this.clonedComponents.delete(elementId))
  }
}
