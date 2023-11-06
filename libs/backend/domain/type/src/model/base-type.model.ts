import type { IBaseTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'

// @ts-ignore
export abstract class BaseType implements IBaseTypeDTO {
  id: string

  kind: ITypeKind

  name: string

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
