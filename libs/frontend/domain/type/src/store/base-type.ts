import type {
  IBaseType,
  IBaseTypeDTO,
  ICreateTypeInput,
  IUpdateTypeVars,
} from '@codelab/frontend/abstract/core'

export const updateBaseTypeCache = (
  self: IBaseType<IBaseTypeDTO, ICreateTypeInput, IUpdateTypeVars>,
  /**
   * We don't allow changing some properties after creation
   */
  { id, kind, name, owner }: Partial<Omit<IBaseTypeDTO, '__typename'>>,
) => {
  // self.id = type.id
  self.name = name ?? self.name
  // self.kind = type.kind
  // self.owner = type.owner

  return self
}
