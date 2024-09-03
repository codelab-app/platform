import {
  type IComponentService,
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import {
  componentRef,
  type IComponentModel,
} from '@codelab/frontend/abstract/domain'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useStoreService } from '@codelab/frontend-application-store/services'
import {
  componentRepository,
  GetComponentBuilder,
} from '@codelab/frontend-domain-component/repositories'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import type {
  ICreateComponentData,
  IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import type {
  ComponentBuilderFragment,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/infra/gql'
import { componentBuilderQuery } from '../use-cases/component-builder'
import { revalidateComponentListOperation } from '../use-cases/component-list'

export const useComponentService = (): IComponentService => {
  const { componentDomainService } = useDomainStore()
  const elementService = useElementService()

  const {
    pagination: { componentPagination },
    rendererService,
  } = useApplicationStore()

  const create = async ({ id, name, rootElement }: ICreateComponentData) => {
    const component = componentDomainService.add({ id, name, rootElement })

    await componentRepository.add(component)

    await revalidateComponentListOperation()

    componentPagination.dataRefs.set(component.id, componentRef(component))

    return component
  }

  const remove = async (components: Array<IComponentModel>) => {
    const deleteComponent = async (component: IComponentModel) => {
      const { id, name } = component
      const rootElement = component.rootElement.maybeCurrent

      if (rootElement) {
        // means root element and the descendants were already requested
        // and hydrated to the store, so we can delete all of them right away
        await elementService.deleteElement(rootElement)
      } else {
        // means we do not have root element and all the descendants on client side
        // need to get all descendant element IDs and delete them
        const data = await componentBuilderQuery({ componentName: name })
        const elements = (data.component as ComponentBuilderFragment).elements

        await elementRepository.delete(elements)
      }

      componentDomainService.components.delete(id)

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

    return { items, totalItems: componentPagination.totalItems }
  }

  componentPagination.getDataFn = getDataFn

  return {
    create,
    getAll,
    getOne,
    importComponent,
    paginationService: componentPagination,
    previewComponent,
    remove,
    update,
  }
}
