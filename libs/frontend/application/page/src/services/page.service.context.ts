import type { IPageApplicationService } from '@codelab/frontend/abstract/application'
import { createContext } from 'mobx-keystone'

export const pageServiceContext = createContext<IPageApplicationService>()

export const getPageService = (self: object) => {
  const pageService = pageServiceContext.get(self)

  if (!pageService) {
    throw new Error('pageServiceContext is not defined')
  }

  return pageService
}
