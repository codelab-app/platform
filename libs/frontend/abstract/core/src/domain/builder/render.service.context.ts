import { createContext } from 'mobx-keystone'
import type { IRenderService } from './render.service.interface'

export const builderRenderServiceContext = createContext<IRenderService>()

export const getBuilderRenderService = (self: object) => {
  const builderRenderService = builderRenderServiceContext.get(self)

  if (!builderRenderService) {
    throw new Error('builderRenderServiceContext is not defined')
  }

  return builderRenderService
}
