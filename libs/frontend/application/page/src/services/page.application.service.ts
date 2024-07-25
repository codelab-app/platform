import { type IPageApplicationService } from '@codelab/frontend/abstract/application'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import {
  pageApi,
  pageRepository,
} from '@codelab/frontend-domain-page/repositories'
import { PageDomainService } from '@codelab/frontend-domain-page/services'
import type { PageWhere } from '@codelab/shared/abstract/codegen'
import type { IElementDto } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { useMemo } from 'react'

export const usePageApplicationService = (): IPageApplicationService => {
  const { elementDomainService } = useDomainStore()
  const pageDomainService = useMemo(() => new PageDomainService({}), [])

  const getAll = async (where: PageWhere) => {
    const { items: pages } = await pageRepository.find(where)

    return pages.map((page) => pageDomainService.hydrate(page))
  }

  const getOne = async (id: string) => {
    const pages = await getAll({ id })

    return pages[0]
  }

  const getRenderedPage = async (pageId: string) => {
    return await pageApi.GetRenderedPage({ pageId })
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

  return {
    getAll,
    getOne,
    getPagesByApp,
    getRenderedPage,
    getSelectPageOptions,
    loadElements,
  }
}
