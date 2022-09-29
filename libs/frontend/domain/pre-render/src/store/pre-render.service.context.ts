import { IPreRender, IPreRenderService } from '@codelab/frontend/abstract/core'
import { createContext, detach, rootRef } from 'mobx-keystone'

export const preRenderRef = rootRef<IPreRender>('@codelab/PreRenderRef', {
  onResolvedValueChange(ref, newPreRender, oldPreRender) {
    if (oldPreRender && !newPreRender) {
      detach(ref)
    }
  },
})

export const preRenderServiceContext = createContext<IPreRenderService>()

export const getPreRenderService = (self: any) => {
  const preRenderService = preRenderServiceContext.get(self)

  if (!preRenderService) {
    throw new Error('preRenderServiceContext is not set')
  }

  return preRenderService
}
