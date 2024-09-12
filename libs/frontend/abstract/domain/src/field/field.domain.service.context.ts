import { type AnyModel, createContext } from 'mobx-keystone'
import type { IFieldDomainService } from './field.domain.service.interface'

export const fieldDomainServiceContext = createContext<IFieldDomainService>()

export const getFieldDomainService = (self: AnyModel) => {
  const fieldService = fieldDomainServiceContext.get(self)

  if (!fieldService) {
    throw new Error('fieldDomainServiceContext is not defined')
  }

  return fieldService
}
