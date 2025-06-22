import type { IActionService } from '@codelab/frontend-abstract-application'

import { type AnyModel, createContext } from 'mobx-keystone'

export const actionServiceContext = createContext<IActionService>()

export const getActionService = (self: AnyModel) => {
  const actionStore = actionServiceContext.get(self)

  if (!actionStore) {
    throw new Error('ActionService context is not defined')
  }

  return actionStore
}
