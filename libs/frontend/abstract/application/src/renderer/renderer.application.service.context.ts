import { createContext } from 'mobx-keystone'
import type { IRendererApplicationService } from './renderer.application.service.interface'

export const rendererServiceContext =
  createContext<IRendererApplicationService>()

export const getRendererService = (self: object) => {
  const renderService = rendererServiceContext.get(self)

  if (!renderService) {
    throw new Error('rendererServiceContext is not defined')
  }

  return renderService
}
