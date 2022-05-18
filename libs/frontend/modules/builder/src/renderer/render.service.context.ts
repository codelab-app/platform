import { IRenderService } from '@codelab/shared/abstract/core'
import { createContext } from 'mobx-keystone'

// This can be used to access the renderer model  from anywhere inside the pipeline
export const renderServiceContext = createContext<IRenderService>()

export const getRenderService = (self: object) => {
  const renderService = renderServiceContext.get(self)

  if (!renderService) {
    throw new Error('RenderService context is not defined')
  }

  return renderService
}
