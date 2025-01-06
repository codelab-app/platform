import type {
  ComponentBuilderFragment,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/infra/gql'

import {
  type GetDataFn,
  type IComponentService,
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { type IComponentModel } from '@codelab/frontend/abstract/domain'
import { useHydrateStore } from '@codelab/frontend/infra/context'
import { useElementService } from '@codelab/frontend-application-element/services'
import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { componentRepository } from '@codelab/frontend-domain-component/repositories'
import { componentFactory } from '@codelab/frontend-domain-component/services'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { storeRepository } from '@codelab/frontend-domain-store/repositories'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import {
  type ICreateComponentData,
  type IRef,
  type IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

import { componentBuilderQuery } from '../use-cases/component-builder'

export const useComponentService = (): IComponentService => {
  const { atomDomainService, componentDomainService, userDomainService } =
    useDomainStore()

  const hydrate = useHydrateStore()
  const elementService = useElementService()
  const owner = userDomainService.user

  const {
    pagination: { componentPagination },
    rendererService,
  } = useApplicationStore()

  const create = async (data: ICreateComponentData) => {
    const { component, storeApi } = componentFactory(
      { ...data, owner },
      atomDomainService.defaultRenderType,
    )

    hydrate({
      componentsDto: [component.component],
      elementsDto: [component.rootElement],
      storesDto: [component.store],
      typesDto: [component.api, storeApi],
    })

    await typeRepository.add(component.api)
    await typeRepository.add(storeApi)
    await storeRepository.add(component.store)
    await elementRepository.add(component.rootElement)
    await componentRepository.add(component.component)

    return componentDomainService.component(data.id)
  }

  const removeMany = async (components: Array<IComponentModel>) => {
    const deleteComponent = async (component: IComponentModel) => {
      const { id } = component
      const rootElement = component.rootElement.maybeCurrent

      if (rootElement) {
        // means root element and the descendants were already requested
        // and hydrated to the store, so we can delete all of them right away
        await elementService.remove(rootElement)
      } else {
        // means we do not have root element and all the descendants on client side
        // need to get all descendant element IDs and delete them
        const data = await componentBuilderQuery({ componentId: id })
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

  const update = async (data: IUpdateComponentData) => {
    return await componentRepository.update({ id: data.id }, data)
  }

  const previewComponent = (id: string) => {
    const component = componentDomainService.component(id)

    const renderer = rendererService.hydrate({
      containerNode: component,
      id: v4(),
      rendererType: RendererType.ComponentBuilder,
    })

    rendererService.setActiveRenderer(rendererRef(renderer))
  }

  const getDataFn: GetDataFn<IComponentModel> = async (
    page,
    pageSize,
    filter,
    search,
  ) => {
    const items = await getAll(graphqlFilterMatches(filter, search), {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    })

    return { items, totalItems: componentPagination.totalItems }
  }

  return {
    create,
    getAll,
    getDataFn,
    getOne,
    importComponent,
    paginationService: componentPagination,
    previewComponent,
    removeMany,
    update,
  }
}
