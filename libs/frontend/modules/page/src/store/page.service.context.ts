import { createContext } from 'mobx-keystone'
import { PageService } from './page.service'

export const pageServiceContext = createContext<PageService>()

export const getPageService = (self: any) => {
  const pageService = pageServiceContext.get(self)

  if (!pageService) {
    throw new Error('pageServiceContext is not defined')
  }

  return pageService
}
