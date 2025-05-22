import type {
  IComponentModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import type {
  ComponentBuilderFragment,
  ComponentOptions,
  ComponentWhere,
} from '@codelab/shared/infra/gqlgen'

import {
  type IComponentService,
  rendererRef,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { useDomainStoreHydrator } from '@codelab/frontend/infra/context'
import { useElementService } from '@codelab/frontend-application-element/services'
import { componentRepository } from '@codelab/frontend-domain-component/repositories'
import {
  componentFactory,
  componentWithoutRootFactory,
} from '@codelab/frontend-domain-component/services'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { storeRepository } from '@codelab/frontend-domain-store/repositories'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import {
  type ICreateComponentData,
  type IUpdateComponentData,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

import { componentBuilderQuery } from '../use-cases/component-builder'

export const useComponentService = (): IComponentService => {
  const { atomDomainService, componentDomainService, userDomainService } =
    useDomainStore()

  const hydrate = useDomainStoreHydrator()
  const elementService = useElementService()
  const owner = userDomainService.user
  const { rendererService } = useApplicationStore()

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
    await componentRepository.add(component.component, {
      revalidateTags: [CACHE_TAGS.Component.list()],
    })

    return componentDomainService.component(data.id)
  }

  const createWithoutRoot = async (
    data: ICreateComponentData,
    rootElement: IElementModel,
  ) => {
    const { component, storeApi } = componentWithoutRootFactory(
      { ...data, owner },
      rootElement,
    )

    rootElement.detachFromTree()

    hydrate({
      componentsDto: [component.component],
      storesDto: [component.store],
      typesDto: [component.api, storeApi],
    })

    rootElement.attachAsComponentRoot(component.component)

    await elementService.syncModifiedElements()
    await typeRepository.add(component.api)
    await typeRepository.add(storeApi)
    await storeRepository.add(component.store)
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

      await componentRepository.delete([component], {
        revalidateTags: [CACHE_TAGS.Component.list()],
      })

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
    const component = componentDomainService.component(data.id)

    component.writeCache(data)

    return await componentRepository.update({ id: data.id }, component.toJson, {
      revalidateTags: [CACHE_TAGS.Component.list()],
    })
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

  return {
    create,
    createWithoutRoot,
    getAll,
    getOne,
    importComponent,
    previewComponent,
    removeMany,
    update,
  }
}
