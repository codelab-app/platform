import type { IBaseType, ITypeDTO } from '@codelab/frontend/abstract/core'

export const updateBaseTypeCache = (self: IBaseType, type: ITypeDTO) => {
  self.id = type.id
  self.name = type.name
  self.kind = type.kind
  self.owner = type.owner

  return self
}
