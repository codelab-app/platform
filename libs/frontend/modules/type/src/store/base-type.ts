import { IBaseType, ITypeDTO } from '@codelab/shared/abstract/core'

export const updateBaseTypeCache = (self: IBaseType, type: ITypeDTO) => {
  self.name = type.name

  // self.owner = User.hydrate(type.owner)
  return self
}
