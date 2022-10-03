import { IPreRenderService } from '@codelab/frontend/abstract/core'
import { createContext } from 'mobx-keystone'

export const preRenderServiceContext = createContext<IPreRenderService>()

export const getPreRenderService = (self: any) => {
  const preRenderService = preRenderServiceContext.get(self)

  if (!preRenderService) {
    throw new Error('preRenderServiceContext is not set')
  }

  return preRenderService
}
