import {
  type IComponentService,
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import { componentRef } from '@codelab/frontend/abstract/domain'
import { useElementService } from '@codelab/frontend-application-element/services'
import { usePaginationService } from '@codelab/frontend-application-shared-store/pagination'
import { useStoreService } from '@codelab/frontend-application-store/services'
import { componentRepository } from '@codelab/frontend-domain-component/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import type {
  ICreateComponentData,
  IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import type {
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/infra/gql'
import { revalidateComponentListOperation } from '../use-cases/component-list'

export const useComponentService = (): IComponentService => {
  const { componentDomainService } = useDomainStore()
  const elementService = useElementService()
  const { rendererService } = useApplicationStore()
  const storeService = useStoreService()

  const create = async ({ id, name, rootElement }: ICreateComponentData) => {
    const component = componentDomainService.add({ id, name, rootElement })

    await componentRepository.add(component)

    await revalidateComponentListOperation()

    paginationService.dataRefs.set(component.id, componentRef(component))

    return component
  }

  const remove = async (components: Array<IComponentModel>) => {
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

    const operations = await Promise.all(
      components.map((component) => deleteComponent(component)),
    )

    await revalidateComponentListOperation()

    return operations.length
  }

  const getAll = async (
    where: ComponentWhere = {},
    options?: ComponentOptions,
  ) => {
    const { items: components } = await componentRepository.find(where, options)

    return components.map((component) =>
      componentDomainService.hydrate(component),
    )
  }

  const getOne = async (id: string) => {
    if (componentDomainService.components.has(id)) {
      return componentDomainService.components.get(id)
    }

    const all = await getAll({ id })

    return all[0]
  }

  const importComponent = async (componentDataFile: File) => {
    const formData = new FormData()

    formData.append('file', componentDataFile)

    return Promise.resolve(undefined)
  }

  const update = async ({ id, name }: IUpdateComponentData) => {
    const component = componentDomainService.components.get(id)

    if (!component) {
      throw new Error('ID not found')
    }

    component.writeCache({ name })

    await componentRepository.update(component)

    return component
  }

  const previewComponent = (id: string) => {
    const component = componentDomainService.component(id)

    const renderer = rendererService.hydrate({
      containerNode: component,
      id: component.id,
      rendererType: RendererType.ComponentBuilder,
    })

    rendererService.setActiveRenderer(rendererRef(renderer))
  }

  // Initialize pagination service
  const getDataFn = async (
    page: number,
    pageSize: number,
    filter: { name?: string },
  ) => {
    const items = await getAll(
      { compositeKey_MATCHES: `(?i).*${filter.name ?? ''}.*` },
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
    importComponent,
    paginationService,
    previewComponent,
    remove,
    update,
  }
}
