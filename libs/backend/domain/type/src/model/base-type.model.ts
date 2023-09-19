import type { IBaseTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'

export abstract class BaseType implements IBaseTypeDTO {
  id: string

  name: string

  kind: ITypeKind

  constructor({ id, kind, name }: IBaseTypeDTO) {
    this.id = id
    this.name = name
    this.kind = kind
  }

  assertCreateFailed<Model>(data: Array<Model>) {
    if (!data[0]) {
      throw new Error('Create failed')
    }

    return data[0]
  }
}
