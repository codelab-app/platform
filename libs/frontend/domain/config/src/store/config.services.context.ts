import { createContext } from 'mobx-keystone'
import type { ConfigService } from './config.service'

export const configServiceContext = createContext<ConfigService>()

export const getConfigService = (self: object) => {
  const configService = configServiceContext.get(self)

  if (!configService) {
    throw new Error('ConfigServiceContext is not set')
  }

  return configService
}
