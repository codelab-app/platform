import { createContext } from 'mobx-keystone'
import type { IRenderService } from './render.service.interface'

export const renderServiceContext = createContext<IRenderService>()

export const getRenderService = (self: object) => {
  const renderService = renderServiceContext.get(self)

  if (!renderService) {
    throw new Error('renderServiceContext is not defined')
  }

  return renderService
}
