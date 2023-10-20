import type { IPropService } from '@codelab/frontend/abstract/application'
import { createContext } from 'mobx-keystone'

export const propServiceContext = createContext<IPropService>()

export const getPropService = (self: object) => {
  const propService = propServiceContext.get(self)

  if (!propService) {
    throw new Error('PropService context is not defined')
  }

  return propService
}
