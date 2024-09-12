import { type AnyModel, createContext } from 'mobx-keystone'
import type { TracerService } from './tracer.service'

export const tracerServiceContext = createContext<TracerService>()

export const getTracerService = (self: AnyModel) => {
  const tracerService = tracerServiceContext.get(self)

  if (!tracerService) {
    throw new Error('tracerServiceContext is not defined')
  }

  return tracerService
}
