import type { IFieldService } from '@codelab/frontend/abstract/domain'
import { createContext } from 'mobx-keystone'

export const fieldServiceContext = createContext<IFieldService>()

export const getFieldService = (self: object) => {
  const fieldService = fieldServiceContext.get(self)

  if (!fieldService) {
    throw new Error('fieldServiceContext is not defined')
  }

  return fieldService
}
