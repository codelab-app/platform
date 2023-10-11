import {
  getBuilderService,
  getElementService,
  getRenderService,
  type IComponentApplicationService,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  ICreateComponentData,
  IElementModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  IUpdateComponentData,
  RendererType,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { getAtomService } from '@codelab/frontend/application/atom'
import { getPropService } from '@codelab/frontend/application/prop'
import { getStoreService } from '@codelab/frontend/application/store'
import { getTagService } from '@codelab/frontend/application/tag'
import { getTypeService } from '@codelab/frontend/application/type'
import { Component } from '@codelab/frontend/domain/component'
import {
  ModalService,
  PaginationService,
} from '@codelab/frontend/domain/shared'
import { Store } from '@codelab/frontend/domain/store'
import { InterfaceType } from '@codelab/frontend/domain/type'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type { IPropDTO } from '@codelab/shared/abstract/core'
import {
  IComponentDTO,
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import flatMap from 'lodash/flatMap'
import isEmpty from 'lodash/isEmpty'
import sortBy from 'lodash/sortBy'
import uniq from 'lodash/uniq'
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
import { ComponentRepository } from './component.repo'
import { ComponentFormService } from './component-form.service'
import { ComponentModalService } from './component-modal.service'

/**
 * Component service will use ref from ElementService
 */
@model('@codelab/ComponentApplicationService')
export class ComponentApplicationService
  extends Model({
    allComponentsLoaded: prop(() => false),
    clonedComponents: prop(() => objectMap<IComponentModel>()),
    componentRepository: prop(() => new ComponentRepository({})),
    components: prop(() => objectMap<IComponentModel>()),
    createForm: prop(() => new ComponentFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteModal: prop(() => new ComponentModalService({})),
    id: idProp,
    paginationService: prop(
      () => new PaginationService<IComponentModel, { name?: string }>({}),
    ),
    updateModal: prop(() => new ComponentModalService({})),
  })
  implements IComponentApplicationService
{
  @computed
  get componentList() {
    return [...this.components.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: ComponentApplicationService,
    { id, keyGenerator, name, rootElement }: ICreateComponentData,
  ) {
    const storeApi = this.typeService.typeDomainService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${name} Store`),
    })

    const store = this.storeService.storeDomainService.add({
      api: typeRef<IInterfaceTypeModel>(storeApi.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const fragmentAtom = this.atomService.atomDomainService.defaultRenderType

    this.atomService.atomDomainService.add(fragmentAtom)

    const api = this.typeService.typeDomainService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(name),
    })

    const componentProps: IPropDTO = {
      data: '{}',
      id: v4(),
    }

    /**
     * create rootElement in case it doesn't already exist
     * Unlike other models such rootElement could exist before component (convertElementToComponent)
     * connectOrCreate can't handle sub-models like props for element
     * the only choice left is to create rootElement here if it is not provided
     * */
    const rootElementExists =
      rootElement &&
      this.elementService.elementDomainService.elements.has(rootElement.id)

    let rootElementModel: IElementModel | null = rootElementExists
      ? this.elementService.element(rootElement.id)
      : null

    const elementData = {
      closestContainerNode: {
        id,
      },
      id: v4(),
      name: `${name} Root`,
      parentComponent: { id },
      props: {
        data: '{}',
        id: v4(),
      },
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: fragmentAtom.id,
      },
    }

    if (!rootElementModel) {
      rootElementModel =
        this.elementService.elementDomainService.hydrate(elementData)
    }

    /**
     * create rootElement in case it doesn't already exist
     * Unlike other models such rootElement could exist before component (convertElementToComponent)
     * connectOrCreate can't handle sub-models like props for element
     * the only choice left is to create rootElement here if it is not provided
     * */
    const rootElementExists =
      rootElement &&
      this.elementService.elementDomainService.elements.has(rootElement.id)

    let rootElementModel: IElementModel | null = rootElementExists
      ? this.elementService.element(rootElement.id)
      : null

    const elementData = {
      closestContainerNode: {
        id,
      },
      id: v4(),
      name: `${name} Root`,
      parentComponent: { id },
      props: {
        data: '{}',
        id: v4(),
      },
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: fragmentAtom.id,
      },
    }

    if (!rootElementModel) {
      rootElementModel =
        this.elementService.elementDomainService.hydrate(elementData)
    }

    const component = this.add({
      api,
      childrenContainerElement: { id: rootElementModel.id },
      id,
      keyGenerator,
      name,
      props: componentProps,
      rootElement: rootElementModel,
      store,
    })

    yield* _await(this.elementService.createElement(elementData))

    yield* _await(this.componentRepository.add(component))

    this.paginationService.dataRefs.set(component.id, componentRef(component))

    return component
  })

  @modelFlow
  @transaction
  delete = _async(function* (
    this: ComponentApplicationService,
    components: Array<IComponentModel>,
  ) {
    const deleteComponent = async (component: IComponentModel) => {
      const { id } = component
      const store = component.store.current
      const rootElement = component.rootElement.current

      await this.elementService.delete(rootElement)

      this.components.delete(id)
      this.removeClones(id)

      await this.storeService.delete([store])
      await this.componentRepository.delete([component])

      return component
    }

    yield* _await(
      Promise.all(components.map((component) => deleteComponent(component))),
    )

    return
  })

  @modelFlow
  @transaction
  getAll = _async(function* (
    this: ComponentApplicationService,
    where: ComponentWhere = {},
    options?: ComponentOptions,
  ) {
    if (this.allComponentsLoaded) {
      return this.componentList
    }

    const { items: components } = yield* _await(
      this.componentRepository.find(where, options),
    )

    if (isEmpty(where)) {
      this.allComponentsLoaded = true
    }

    const componentModels = components.map((component) => {
      const { id } = component

      this.storeService.load([component.store])
      this.typeService.loadTypes({ interfaceTypes: [component.api] })

      const allElements = [
        component.rootElement,
        ...component.rootElement.descendantElements,
      ]

      allElements.forEach((elementData) => {
        /**
         * Element comes with `component` or `atom` data that we need to load as well
         * TODO: Need to handle component case, refactor reuse
         */
        if (elementData.renderType.__typename === IElementRenderTypeKind.Atom) {
          this.typeService.loadTypes({
            interfaceTypes: [elementData.renderType.api],
          })

          elementData.renderType.tags.forEach((tag) => this.tagService.add(tag))

          this.atomService.atomDomainService.add(elementData.renderType)
        }

        this.elementService.elementDomainService.hydrate({
          ...elementData,
          closestContainerNode: { id },
          parentElement: elementData.parentElement,
        })
      })

      return this.add(component)
    })

    const allComponentsFieldTypeIds = uniq(
      flatMap(componentModels, (component) =>
        component.api.current.fields.map((field) => field.type.id),
      ).filter((id) => !this.typeService.typeDomainService.types.has(id)),
    )

    if (allComponentsFieldTypeIds.length > 0) {
      yield* _await(this.typeService.getAll(allComponentsFieldTypeIds))
    }

    return componentModels
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: ComponentApplicationService, id: string) {
    if (this.components.has(id)) {
      return this.components.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  getSelectComponentOptions = _async(function* (
    this: ComponentApplicationService,
  ) {
    yield* _await(this.getAll())

    const parentComponent = this.builderService.activeComponent?.current

    const filtered = this.sortedComponentsList.filter((component) => {
      if (component.id === parentComponent?.id) {
        return false
      }

      const parentIsDescendant = component.descendantComponents.some(
        ({ id }) => id === parentComponent?.id,
      )

      return !parentComponent?.id || !parentIsDescendant
    })

    return filtered.map((component) => ({
      label: component.name,
      value: component.id,
    }))
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ComponentApplicationService,
    { childrenContainerElement, id, keyGenerator, name }: IUpdateComponentData,
  ) {
    const component = this.components.get(id)

    if (!component) {
      throw new Error('ID not found')
    }

    component.writeCache({ childrenContainerElement, keyGenerator, name })
    this.writeCloneCache({ childrenContainerElement, id, keyGenerator, name })

    yield* _await(this.componentRepository.update(component))

    return component
  })

  @modelAction
  add(componentDTO: IComponentDTO) {
    let component = this.components.get(componentDTO.id)

    if (component) {
      component.writeCache(componentDTO)
    } else {
      component = Component.create(componentDTO)

      this.renderService.addRenderer({
        elementTree: component,
        id: component.id,
        providerTree: null,
        rendererType: RendererType.ComponentBuilder,
      })

      this.components.set(component.id, component)
    }

    return component
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
  maybeComponent(id: string) {
    return this.components.get(id) || this.clonedComponents.get(id)
  }

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

  @modelAction
  private removeClones(componentId: string) {
    return [...this.clonedComponents.entries()]
      .filter(([_, component]) => component.sourceComponent?.id === componentId)
      .forEach(([elementId]) => this.clonedComponents.delete(elementId))
  }

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

  @computed
  private get atomService() {
    return getAtomService(this)
  }

  @computed
  private get builderService() {
    return getBuilderService(this)
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get propService() {
    return getPropService(this)
  }

  @computed
  private get renderService() {
    return getRenderService(this)
  }

  @computed
  private get sortedComponentsList() {
    return sortBy(this.componentList, 'name')
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }

  @computed
  private get tagService() {
    return getTagService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }
}
