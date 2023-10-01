import type {
  IComponentModel,
  IComponentService,
  ICreateComponentData,
  IElementModel,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import {
  componentRef,
  getElementService,
  getRenderService,
  IUpdateComponentData,
  RendererType,
  typeRef,
} from '@codelab/frontend/abstract/core'
import { getAtomService } from '@codelab/frontend/domain/atom'
import { getPropService } from '@codelab/frontend/domain/prop'
import {
  ModalService,
  PaginationService,
} from '@codelab/frontend/domain/shared'
import { getStoreService, Store } from '@codelab/frontend/domain/store'
import { getTagService } from '@codelab/frontend/domain/tag'
import { getTypeService, InterfaceType } from '@codelab/frontend/domain/type'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import {
  IComponentDTO,
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import flatMap from 'lodash/flatMap'
import isEmpty from 'lodash/isEmpty'
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
import { ComponentRepository } from '../services/component.repo'
import { Component } from './component.model'
import { ComponentFormService } from './component-form.service'
import { ComponentModalService } from './component-modal.service'

/**
 * Component service will use ref from ElementService
 */
@model('@codelab/ComponentService')
export class ComponentService
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
  implements IComponentService
{
  @computed
  get componentList() {
    return [...this.components.values()]
  }

  @modelFlow
  @transaction
  create = _async(function* (
    this: ComponentService,
    { id, keyGenerator, name, rootElement }: ICreateComponentData,
  ) {
    const storeApi = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${name} Store`),
    })

    const store = this.storeService.add({
      api: typeRef<IInterfaceType>(storeApi.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    // There must be a better way to do this, this is just temp to make things work for now
    // The root element of a component must have a renderType of ReactFragment atom
    const fragmentAtom = yield* _await(
      this.atomService.atomRepository.findOne({ name: 'ReactFragment' }),
    )

    if (!fragmentAtom) {
      throw new Error('Cannot get ReactFragment')
    }

    this.atomService.add(fragmentAtom)

    const api = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(name),
    })

    const componentProps = this.propService.add({
      data: '{}',
      id: v4(),
    })

    /**
     * create rootElement in case it doesn't already exist
     * Unlike other models such rootElement could exist before component (convertElementToComponent)
     * connectOrCreate can't handle sub-models like props for element
     * the only choice left is to create rootElement here if it is not provided
     * */
    const rootElementExists =
      rootElement && this.elementService.elements.has(rootElement.id)

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
      rootElementModel = this.elementService.add(elementData)
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

    yield* _await(this.elementService.create(elementData))

    yield* _await(this.componentRepository.add(component))

    this.paginationService.dataRefs.set(component.id, componentRef(component))

    return component
  })

  @modelFlow
  @transaction
  delete = _async(function* (
    this: ComponentService,
    components: Array<IComponentModel>,
  ) {
    const deleteComponent = async (component: IComponentModel) => {
      const { id } = component
      const store = component.store.current
      const rootElement = component.rootElement.current

      this.components.delete(id)
      this.removeClones(id)

      await this.storeService.delete([store])
      await this.elementService.delete(rootElement)
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
    this: ComponentService,
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
      this.propService.add(component.props)
      this.typeService.loadTypes({ interfaceTypes: [component.api] })

      const allElements = [
        component.rootElement,
        ...component.rootElement.descendantElements,
      ]

      allElements.forEach((elementData) => {
        this.propService.add(elementData.props)

        /**
         * Element comes with `component` or `atom` data that we need to load as well
         * TODO: Need to handle component case, refactor reuse
         */
        if (elementData.renderType.__typename === IElementRenderTypeKind.Atom) {
          this.typeService.loadTypes({
            interfaceTypes: [elementData.renderType.api],
          })

          elementData.renderType.tags.forEach((tag) => this.tagService.add(tag))

          this.atomService.add(elementData.renderType)
        }

        this.elementService.add({
          ...elementData,
          closestContainerNode: { id },
          parentElement: elementData.parent,
        })
      })

      return this.add(component)
    })

    const allComponentsFieldTypeIds = uniq(
      flatMap(componentModels, (component) =>
        component.api.current.fields.map((field) => field.type.id),
      ).filter((id) => !this.typeService.types.has(id)),
    )

    if (allComponentsFieldTypeIds.length > 0) {
      yield* _await(this.typeService.getAll(allComponentsFieldTypeIds))
    }

    return componentModels
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
  update = _async(function* (
    this: ComponentService,
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
    let component = this.maybeComponent(componentDTO.id)

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
