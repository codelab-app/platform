import { createContext } from 'mobx-keystone'
import type { ITagDomainService } from './tag.domain.service.interface'

export const tagDomainServiceContext = createContext<ITagDomainService>()

export const getTagDomainService = (self: object) => {
  const tagDomainService = tagDomainServiceContext.get(self)

  if (!tagDomainService) {
    throw new Error('tagDomainServiceContext is not defined')
  }

  return tagDomainService
}
