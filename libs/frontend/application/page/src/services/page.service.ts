import type {
  IPageService,
  PageContextParams,
} from '@codelab/frontend/abstract/application'
import type {
  IElementDto,
  IPageCreateFormData,
  IPageUpdateFormData,
} from '@codelab/shared/abstract/core'
import type { PageWhere } from '@codelab/shared/infra/gqlgen'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { PageType } from '@codelab/frontend/abstract/application'
import { type IPageModel } from '@codelab/frontend/abstract/domain'
import { elementRepository } from '@codelab/frontend-domain-element/repositories'
import { pageRepository } from '@codelab/frontend-domain-page/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/typebox'
import { pageApi, pageServerActions } from '@codelab/shared-domain-module/page'

import { createPageAction } from '../use-cases/create-page'
import { createPageFactory } from '../use-cases/create-page/create-page.factory'

const { GetRenderedPage } = pageServerActions

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
    const { items: pages } = await pageApi().PageList({
      where: appId ? { appConnection: { node: { id: appId } } } : {},
    })

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

    // revalidateTag(CACHE_TAGS.PageList())
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

  const createPopover = {
    close: (router: AppRouterInstance, params: PageContextParams) => {
      router.push(PageType.PageList(params))
    },
    open: (router: AppRouterInstance, params: PageContextParams) => {
      router.push(PageType.PageCreate(params))
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance, params: PageContextParams) => {
      router.push(PageType.PageList(params))
    },
    open: (router: AppRouterInstance, params: PageContextParams) => {
      router.push(PageType.PageUpdate(params))
    },
  }

  const deletePopover = {
    close: (router: AppRouterInstance, params: PageContextParams) => {
      router.push(PageType.PageList(params))
    },
    open: (router: AppRouterInstance, params: PageContextParams) => {
      const baseUrl = PageType.PageDelete(params)

      router.push(`${baseUrl}`)
    },
  }

  return {
    create,
    createPopover,
    deletePopover,
    getAll,
    getOne,
    getPagesByApp,
    getRenderedPage,
    getSelectPageOptions,
    loadElements,
    removeMany,
    update,
    updatePopover,
  }
}
