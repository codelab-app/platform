import { createContext } from 'mobx-keystone'
import type { RenderService } from './RenderService'

// This can be used to access the renderer model  from anywhere inside the pipeline
export const renderServiceContext = createContext<RenderService>()

export const getRenderContext = (thisModel: object) => {
  const renderModel = renderServiceContext.get(thisModel)

  if (!renderModel) {
    throw new Error('RenderService context is not defined')
  }

  return renderModel
}
