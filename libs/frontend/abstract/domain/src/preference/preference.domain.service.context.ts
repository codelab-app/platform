import { createContext } from 'mobx-keystone'
import type { IPreferenceDomainService } from './preference.domain.service.interface'

export const preferenceDomainServiceContext =
  createContext<IPreferenceDomainService>()

export const getPreferenceDomainService = (self: object) => {
  const preferenceService = preferenceDomainServiceContext.get(self)

  if (!preferenceService) {
    throw new Error('PreferenceDomainServiceContext is not defined')
  }

  return preferenceService
}
