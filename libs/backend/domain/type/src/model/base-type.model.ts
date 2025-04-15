import type {
  IBaseTypeDto,
  IRef,
  ITypeKind,
} from '@codelab/shared-abstract-core'

export abstract class BaseType implements Omit<IBaseTypeDto, '__typename'> {
  id: string

  kind: ITypeKind

  name: string

  owner: IRef

  constructor({ id, kind, name, owner }: Omit<IBaseTypeDto, '__typename'>) {
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
