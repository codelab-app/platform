import { IBaseType, ITypeDTO } from '@codelab/frontend/abstract/core'

export const updateBaseTypeCache = (self: IBaseType, type: ITypeDTO) => {
  self.id = type.id
  self.name = type.name
  self.kind = type.kind
  self.ownerId = type.owner.id

  return self
}
