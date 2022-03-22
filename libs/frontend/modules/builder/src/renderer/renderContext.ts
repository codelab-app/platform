import { createContext } from 'mobx-keystone'
import type { RendererModel } from './RendererModel'

// This can be used to access the renderer model  from anywhere inside the pipeline
export const renderContext = createContext<RendererModel>()

export const getRenderContext = (thisModel: object) => {
  const renderModel = renderContext.get(thisModel)

  if (!renderModel) {
    throw new Error('RendererModel context is not defined')
  }

  return renderModel
}
