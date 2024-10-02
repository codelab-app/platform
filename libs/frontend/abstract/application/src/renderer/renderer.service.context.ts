import { type AnyModel, createContext } from 'mobx-keystone'

import type { IRendererService } from './renderer.service.interface'

export const rendererServiceContext = createContext<IRendererService>()

export const getRendererService = (self: AnyModel) => {
  const renderService = rendererServiceContext.get(self)

  if (!renderService) {
    throw new Error('rendererServiceContext is not defined')
  }

  return renderService
}
