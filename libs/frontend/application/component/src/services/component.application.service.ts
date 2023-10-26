import {
  getElementService,
  type IComponentApplicationService,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  ICreateComponentData,
  IElementModel,
  IInterfaceTypeModel,
  IUpdateComponentData,
} from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  getBuilderDomainService,
  getTagDomainService,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { getAtomService } from '@codelab/frontend/application/atom'
import {
  ModalService,
  PaginationService,
} from '@codelab/frontend/application/shared/store'
import { getStoreService } from '@codelab/frontend/application/store'
import { getTypeService } from '@codelab/frontend/application/type'
import { ComponentDomainService } from '@codelab/frontend/domain/component'
import { Store } from '@codelab/frontend/domain/store'
import { InterfaceType } from '@codelab/frontend/domain/type'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type { IPropDTO } from '@codelab/shared/abstract/core'
import {
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
  modelFlow,
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
    componentDomainService: prop(() => new ComponentDomainService({})),
    componentRepository: prop(() => new ComponentRepository({})),
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
  @modelFlow
  @transaction
  create = _async(function* (
    this: ComponentApplicationService,
    { id, keyGenerator, name, rootElement }: ICreateComponentData,
  ) {
    const storeApi = this.typeService.typeDomainService.hydrateInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.createName(`${name} Store`),
    })

    const store = this.storeService.storeDomainService.hydrate({
      api: typeRef<IInterfaceTypeModel>(storeApi.id),
      id: v4(),
      name: Store.createName({ name }),
    })

    const fragmentAtom = this.atomService.atomDomainService.defaultRenderType

    this.atomService.atomDomainService.hydrate(fragmentAtom)

    const api = this.typeService.typeDomainService.hydrateInterface({
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

    const component = this.componentDomainService.hydrate({
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

      this.componentDomainService.components.delete(id)
      this.componentDomainService.removeClones(id)

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
      return this.componentDomainService.componentList
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
      this.typeService.typeDomainService.hydrateTypes({
        interfaceTypes: [component.api],
      })

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
          this.typeService.typeDomainService.hydrateTypes({
            interfaceTypes: [elementData.renderType.api],
          })

          elementData.renderType.tags.forEach((tag) =>
            this.tagDomainService.hydrate(tag),
          )

          this.atomService.atomDomainService.hydrate(elementData.renderType)
        }

        this.elementService.elementDomainService.hydrate({
          ...elementData,
          closestContainerNode: { id },
          parentElement: elementData.parentElement,
        })
      })

      return this.componentDomainService.hydrate(component)
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
    if (this.componentDomainService.components.has(id)) {
      return this.componentDomainService.components.get(id)
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

    const filtered = this.componentDomainService.sortedComponentsList.filter(
      (component) => {
        if (component.id === parentComponent?.id) {
          return false
        }

        const parentIsDescendant = component.descendantComponents.some(
          ({ id }) => id === parentComponent?.id,
        )

        return !parentComponent?.id || !parentIsDescendant
      },
    )

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
    const component = this.componentDomainService.components.get(id)

    if (!component) {
      throw new Error('ID not found')
    }

    component.writeCache({ childrenContainerElement, keyGenerator, name })
    this.componentDomainService.writeCloneCache({
      childrenContainerElement,
      id,
      keyGenerator,
      name,
    })

    yield* _await(this.componentRepository.update(component))

    return component
  })

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
  private get atomService() {
    return getAtomService(this)
  }

  @computed
  private get builderService() {
    return getBuilderDomainService(this)
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }

  @computed
  private get storeService() {
    return getStoreService(this)
  }

  @computed
  private get tagDomainService() {
    return getTagDomainService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }
}
