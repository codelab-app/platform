import {
  getBuilderService,
  getElementService,
  getRendererService,
  type IComponentApplicationService,
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import {
  componentRef,
  getTagDomainService,
} from '@codelab/frontend/abstract/domain'
import { downloadJsonAsFile } from '@codelab/frontend/shared/utils'
import { getAtomService } from '@codelab/frontend-application-atom/services'
import { PaginationService } from '@codelab/frontend-application-shared-store/pagination'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
import { getStoreService } from '@codelab/frontend-application-store/services'
import { getTypeService } from '@codelab/frontend-application-type/services'
import { ComponentDomainService } from '@codelab/frontend-domain-component/services'
import { restWebClient } from '@codelab/frontend-infra-axios'
import type {
  Component,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/abstract/codegen'
import type {
  IComponentAggregate,
  ICreateComponentData,
  IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import { slugify } from '@codelab/shared/utils'
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
import { ComponentDevelopmentService } from '../use-cases/component-development'
import { ComponentRepository } from './component.repo'
import { ComponentFormService } from './component-form.service'
import { ComponentModalService } from './component-modal.service'

/**
 * Component service will use ref from ElementService
 */
@model('@codelab/ComponentApplicationService')
export class ComponentApplicationService
  extends Model({
    componentDevelopmentService: prop(
      () => new ComponentDevelopmentService({}),
    ),
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

    downloadJsonAsFile(`${slugify(component.name)}.json`, res.data)

    return res
  })

  @modelFlow
  @transaction
  getAll = _async(function* (
    this: ComponentApplicationService,
    where: ComponentWhere = {},
    options?: ComponentOptions,
  ) {
    const { items: components } = yield* _await(
      this.componentRepository.find(where, options),
    )

    return components.map((component) =>
      this.componentDomainService.hydrate(component),
    )
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

    const component = yield* _await(
      restWebClient
        .post<Component>('/component/import', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }) => {
          return this.getOne(data.id)
        }),
    )

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

    this.builderService.selectComponentNode(renderer.runtimeComponent)
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
