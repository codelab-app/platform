import type { IAuth0Owner, IBaseTypeDTO } from '@codelab/frontend/abstract/core'
import type { ITypeKind } from '@codelab/shared/abstract/core'

export abstract class BaseType implements IBaseTypeDTO {
  id: string

  name: string

  kind: ITypeKind

  owner: IAuth0Owner

  constructor({ id, kind, name, owner }: IBaseTypeDTO) {
    this.id = id
    this.name = name
    this.kind = kind
    this.owner = owner
  }

  assertCreateFailed<Model>(data: Array<Model>) {
    if (!data[0]) {
      throw new Error('Create failed')
    }

    return data[0]
  }
}
