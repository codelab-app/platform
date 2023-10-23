import { createContext } from 'mobx-keystone'
import type { IRendererApplicationService } from './renderer.application.service.interface'

export const rendererApplicationServiceContext =
  createContext<IRendererApplicationService>()

export const getRendererApplicationService = (self: object) => {
  const renderService = rendererApplicationServiceContext.get(self)

  if (!renderService) {
    throw new Error('rendererApplicationServiceContext is not defined')
  }

  return renderService
}
