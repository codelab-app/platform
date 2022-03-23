import { createContext } from 'mobx-keystone'
import type { RenderService } from './RenderService'

// This can be used to access the renderer model  from anywhere inside the pipeline
export const renderContext = createContext<RenderService>()

export const getRenderContext = (thisModel: object) => {
  const renderModel = renderContext.get(thisModel)

  if (!renderModel) {
    throw new Error('RenderService context is not defined')
  }

  return renderModel
}
