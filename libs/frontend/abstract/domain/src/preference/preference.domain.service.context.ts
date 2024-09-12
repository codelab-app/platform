import { type AnyModel, createContext } from 'mobx-keystone'
import type { IPreferenceDomainService } from './preference.domain.service.interface'

export const preferenceDomainServiceContext =
  createContext<IPreferenceDomainService>()

export const getPreferenceDomainService = (self: AnyModel) => {
  const preferenceService = preferenceDomainServiceContext.get(self)

  if (!preferenceService) {
    throw new Error('PreferenceDomainServiceContext is not defined')
  }

  return preferenceService
}
