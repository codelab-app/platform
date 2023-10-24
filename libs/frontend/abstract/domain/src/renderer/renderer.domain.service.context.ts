import { createContext } from 'mobx-keystone'
import type { IRendererDomainService } from './renderer.domain.service.interface'

export const rendererDomainServiceContext =
  createContext<IRendererDomainService>()

export const getRendererDomainService = (self: object) => {
  const renderService = rendererDomainServiceContext.get(self)

  if (!renderService) {
    throw new Error('rendererDomainServiceContext is not defined')
  }

  return renderService
}
