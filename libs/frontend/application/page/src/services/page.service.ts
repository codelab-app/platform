import type {
  IElementDto,
  IPageCreateFormData,
  IPageUpdateFormData,
  IRef,
} from '@codelab/shared/abstract/core'
import type { PageWhere } from '@codelab/shared/infra/gql'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { type IPageService } from '@codelab/frontend/abstract/application'
import { type IPageModel } from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import {
  GetRenderedPage,
  pageRepository,
} from '@codelab/frontend-domain-page/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/schema'

import { createPageAction } from '../use-cases/create-page'
import { createPageFactory } from '../use-cases/create-page/create-page.factory'

export const usePageService = (): IPageService => {
  const {
    appDomainService,
    atomDomainService,
    elementDomainService,
    pageDomainService,
    userDomainService,
  } = useDomainStore()

  const { rendererService } = useApplicationStore()
  const owner = userDomainService.user

  const getAll = async (where: PageWhere) => {
    const { items: pages } = await pageRepository.find(where)

    return pages.map((page) => pageDomainService.hydrate(page))
  }

  const getOne = async (id: string) => {
    const pages = await getAll({ id })

    return pages[0]
  }

  const getRenderedPage = async (pageId: string) => {
    return await GetRenderedPage({ pageId })
  }

  const getSelectPageOptions = async (appId?: string) => {
    const pages = await getAll({ appConnection: { node: { id: appId } } })

    return pages.map((page) => ({
      label: page.name,
      value: page.id,
    }))
  }

  const getPagesByApp = (appId: string) => {
    return pageDomainService.pagesList.filter((page) => page.app.id === appId)
  }

  const loadElements = (elements: Array<IElementDto>) => {
    elements.forEach((element) => {
      if (element.renderType.__typename === IElementRenderTypeKind.Atom) {
        console.log('AppService.loadPages() element', element)
        elementDomainService.hydrate(element)
      }
    })
  }

  const create = async (data: IPageCreateFormData) => {
    const { page, rootElement, rootElementProps, store, storeApi } =
      createPageFactory(
        data,
        atomDomainService.defaultRenderType.toJson,
        owner.toJson,
      )

    return await createPageAction(page, store, storeApi, rootElement)

    // revalidateTag(CACHE_TAGS.PAGE_LIST)
  }

  const removeMany = async (pageModels: Array<IPageModel>) => {
    const deletedPages = await Promise.all(
      pageModels.map((page) => remove(page)),
    )

    return deletedPages.length
  }

  const remove = async (pageModel: IPageModel) => {
    const { items: pages } = await pageRepository.find({ id: pageModel.id })
    const elements = pages.flatMap((page) => page.elements)

    elements.forEach((element) =>
      elementDomainService.elements.delete(element.id),
    )

    pages.forEach((page) => {
      rendererService.renderers.delete(page.id)

      pageDomainService.pages.delete(page.id)
    })

    await elementRepository.delete(elements)

    return await pageRepository.delete([pageModel])
  }

  const update = async (data: IPageUpdateFormData) => {
    const app = appDomainService.apps.get(data.app.id)
    const page = app?.page(data.id)
    const { name, pageContentContainer, urlPattern } = data

    Validator.assertsDefined(page)

    page.writeCache({
      app,
      name,
      pageContentContainer,
      urlPattern,
    })

    await pageRepository.update({ id: page.id }, page)

    return page
  }

  const getOneFromCache = (ref: IRef) => {
    return pageDomainService.pages.get(ref.id)
  }

  const getAllFromCache = () => {
    return Array.from(pageDomainService.pages.values())
  }

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (router: AppRouterInstance, appId: string, pageId: string) => {
      router.push(PageType.PageCreate({ appId, pageId }))
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (
      router: AppRouterInstance,
      appId: string,
      pageId: string,
      id: string,
    ) => {
      const baseUrl = PageType.PageUpdate({ appId, pageId })

      router.push(`${baseUrl}/${id}`)
    },
  }

  const deletePopover = {
    close: (router: AppRouterInstance) => {
      router.back()
    },
    open: (
      router: AppRouterInstance,
      appId: string,
      pageId: string,
      id: string,
    ) => {
      const baseUrl = PageType.PageDelete({ appId, pageId })

      router.push(`${baseUrl}/${id}`)
    },
  }

  return {
    create,
    createPopover,
    deletePopover,
    getAll,
    getAllFromCache,
    getOne,
    getOneFromCache,
    getPagesByApp,
    getRenderedPage,
    getSelectPageOptions,
    loadElements,
    removeMany,
    update,
    updatePopover,
  }
}
