import type {
  IBaseType,
  IBaseTypeDTO,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'

export const updateBaseTypeCache = (
  self: IBaseType<IBaseTypeDTO>,
  /**
   * We don't allow changing some properties after creation
   */
  { id, name, kind, owner }: Partial<IBaseTypeDTO>,
) => {
  // self.id = type.id
  self.name = name ?? self.name
  // self.kind = type.kind
  // self.owner = type.owner

  return self
}
