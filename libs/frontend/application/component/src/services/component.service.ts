import {
  getRendererService,
  type IComponentApplicationService,
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { componentRef } from '@codelab/frontend/abstract/domain'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/frontend/infra/gql'
import { useElementService } from '@codelab/frontend-application-element/services'
import { usePaginationService } from '@codelab/frontend-application-shared-store/pagination'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { ModalService } from '@codelab/frontend-application-shared-store/ui'
import { useStoreService } from '@codelab/frontend-application-store/services'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { componentRepository } from '@codelab/frontend-domain-component/repositories'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import type {
  ICreateComponentData,
  IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import { useCallback } from 'react'
import { ComponentDevelopmentService } from '../use-cases/component-development'
import { ComponentFormService } from './component-form.service'
import { ComponentModalService } from './component-modal.service'

export const useComponentService = (): IComponentApplicationService => {
  const { componentDomainService } = useDomainStore()
  const builderService = useBuilderService()
  const elementService = useElementService()
  const rendererService = getRendererService()
  const storeService = useStoreService()
  const typeService = useTypeService()
  // const paginationService = new PaginationService({})
  const modalService = new ModalService({})
  const componentDevelopmentService = new ComponentDevelopmentService({})
  const componentFormService = new ComponentFormService({})
  const componentModalService = new ComponentModalService({})

  const create = useCallback(
    async ({ id, name, rootElement }: ICreateComponentData) => {
      const component = componentDomainService.add({ id, name, rootElement })

      if (!rootElement) {
        await elementRepository.add(component.rootElement.current)
      }

      await componentRepository.add(component)

      paginationService.dataRefs.set(component.id, componentRef(component))

      return component
    },
    [
      componentDomainService,
      elementService,
      componentRepository,
      paginationService,
    ],
  )

  const remove = useCallback(
    async (components: Array<IComponentModel>) => {
      const deleteComponent = async (component: IComponentModel) => {
        const { id } = component
        const store = component.store.current
        const rootElement = component.rootElement.current

        await elementService.deleteElement(rootElement)

        componentDomainService.components.delete(id)

        await storeService.remove([store])
        await componentRepository.delete([component])

        return component
      }

      return (
        await Promise.all(
          components.map((component) => deleteComponent(component)),
        )
      ).length
    },
    [componentDomainService, elementService, storeService, componentRepository],
  )

  const getAll = useCallback(
    async (where: ComponentWhere = {}, options?: ComponentOptions) => {
      const { items: components } = await componentRepository.find(
        where,
        options,
      )

      return components.map((component) =>
        componentDomainService.hydrate(component),
      )
    },
    [componentDomainService, componentRepository],
  )

  const getOne = useCallback(
    async (id: string) => {
      if (componentDomainService.components.has(id)) {
        return componentDomainService.components.get(id)
      }

      const all = await getAll({ id })

      return all[0]
    },
    [componentDomainService, getAll],
  )

  const getSelectComponentOptions = useCallback(async () => {
    await getAll()

    const parentComponent = builderService.activeComponent?.current

    const filtered = componentDomainService.sortedComponentsList.filter(
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
  }, [componentDomainService, builderService, getAll])

  const importComponent = useCallback(async (componentDataFile: File) => {
    const formData = new FormData()

    formData.append('file', componentDataFile)

    return Promise.resolve(undefined)
  }, [])

  const update = useCallback(
    async ({ id, name }: IUpdateComponentData) => {
      const component = componentDomainService.components.get(id)

      if (!component) {
        throw new Error('ID not found')
      }

      component.writeCache({ name })

      await componentRepository.update(component)

      return component
    },
    [componentDomainService, componentRepository],
  )

  const previewComponent = useCallback(
    (id: string) => {
      const component = componentDomainService.component(id)

      const renderer = rendererService.hydrate({
        containerNode: component,
        id: component.id,
        rendererType: RendererType.ComponentBuilder,
      })

      // builderService.selectComponentNode(renderer.runtimeComponent)
      rendererService.setActiveRenderer(rendererRef(renderer))
    },
    [componentDomainService, rendererService],
  )

  // Initialize pagination service
  const getDataFn = async (
    page: number,
    pageSize: number,
    filter: { name?: string },
  ) => {
    const items = await getAll(
      { name_MATCHES: `(?i).*${filter.name ?? ''}.*` },
      {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      },
    )

    return { items, totalItems: paginationService.totalItems }
  }

  const paginationService = usePaginationService<
    IComponentModel,
    { name?: string }
  >('type', getDataFn)

  return {
    create,
    getAll,
    getOne,
    getSelectComponentOptions,
    importComponent,
    paginationService,
    previewComponent,
    remove,
    update,
  }
}
