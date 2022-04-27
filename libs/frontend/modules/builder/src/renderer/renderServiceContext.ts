import { createContext } from 'mobx-keystone'
import type { RenderService } from './render.service'

// This can be used to access the renderer model  from anywhere inside the pipeline
export const renderServiceContext = createContext<RenderService>()

export const getRenderService = (self: object) => {
  const renderService = renderServiceContext.get(self)

  if (!renderService) {
    throw new Error('RenderService context is not defined')
  }

  return renderService
}
