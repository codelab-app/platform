import type { IPageService } from '@codelab/frontend/abstract/core'
import { createContext } from 'mobx-keystone'

export const pageServiceContext = createContext<IPageService>()

export const getPageService = (self: object) => {
  const pageService = pageServiceContext.get(self)

  if (!pageService) {
    throw new Error('pageServiceContext is not defined')
  }

  return pageService
}
