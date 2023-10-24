import { createContext } from 'mobx-keystone'
import type { IActionDomainService } from './action.domain.service.interface'

export const actionDomainServiceContext = createContext<IActionDomainService>()

export const getActionDomainService = (self: object) => {
  const actionStore = actionDomainServiceContext.get(self)

  if (!actionStore) {
    throw new Error('ActionDomainService context is not defined')
  }

  return actionStore
}
