import type { IActionService } from '@codelab/frontend/abstract/core'
import { createContext } from 'mobx-keystone'

export const actionServiceContext = createContext<IActionService>()

export const getActionService = (self: object) => {
  const actionStore = actionServiceContext.get(self)

  if (!actionStore) {
    throw new Error('ActionService context is not defined')
  }

  return actionStore
}
