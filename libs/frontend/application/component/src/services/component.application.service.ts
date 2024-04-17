import {
  getBuilderService,
  getElementService,
  getRendererService,
  type IComponentApplicationService,
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type {
  IComponentModel,
  IElementModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  getTagDomainService,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { getAtomService } from '@codelab/frontend/application/atom'
import { restWebClient } from '@codelab/frontend/application/axios'
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
  Component,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type {
  IComponentAggregate,
  ICreateComponentData,
  IPropDto,
  IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import {
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { prettifyForConsole, slugify } from '@codelab/shared/utils'
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
    { id, name, rootElement }: ICreateComponentData,
  ) {
    const component = this.componentDomainService.add({ id, name, rootElement })

    if (!rootElement) {
      yield* _await(
        this.elementService.elementRepository.add(
          component.rootElement.current,
        ),
      )
    }

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
  exportComponent = _async(function* (
    this: ComponentApplicationService,
    component: IComponentModel,
  ) {
    const res = yield* _await(
      restWebClient.get<IComponentAggregate>(
        `component/export?id=${component.id}`,
      ),
    )

    const filename = `${slugify(component.name)}.json`
    const contentType = 'application/json;charset=utf-8;'
    const a = document.createElement('a')

    a.download = filename
    a.href = `data:${contentType},${encodeURIComponent(
      prettifyForConsole(res.data),
    )}`
    a.target = '_blank'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

    return res
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

      component.elements.forEach((elementData) => {
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
          // Doesn't seem needed in hydrate
          // closestContainerNode: { id },
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
        if (component.id === parentComponent?.component.id) {
          return false
        }

        const parentIsDescendant = component.descendantComponents.some(
          ({ id }) => id === parentComponent?.component.id,
        )

        return !parentComponent?.component.id || !parentIsDescendant
      },
    )

    return filtered.map((component) => ({
      label: component.name,
      value: component.id,
    }))
  })

  @modelFlow
  importComponent = _async(function* (
    this: ComponentApplicationService,
    componentDataFile: File,
  ) {
    const formData = new FormData()

    formData.append('file', componentDataFile)

    const oldLoadedComponentStatus = this.allComponentsLoaded

    this.allComponentsLoaded = false

    const component = yield* _await(
      restWebClient
        .post<Component>('/component/import', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          return this.getOne(data.id)
        }),
    )

    this.allComponentsLoaded = oldLoadedComponentStatus

    return component
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: ComponentApplicationService,
    { id, name }: IUpdateComponentData,
  ) {
    const component = this.componentDomainService.components.get(id)

    if (!component) {
      throw new Error('ID not found')
    }

    component.writeCache({ name })

    yield* _await(this.componentRepository.update(component))

    return component
  })

  @modelAction
  previewComponent = (id: string) => {
    const component = this.componentDomainService.component(id)

    const renderer = this.rendererService.hydrate({
      containerNode: component,
      id: component.id,
      rendererType: RendererType.ComponentBuilder,
    })

    this.builderService.selectComponentNode(renderer.runtimeComponent!)
    this.rendererService.setActiveRenderer(rendererRef(renderer))
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
  private get rendererService() {
    return getRendererService(this)
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
