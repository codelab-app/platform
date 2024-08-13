import {
  type IBaseTypeDto,
  type ITypeKind,
} from '@codelab/shared/abstract/core'

export abstract class BaseType implements Omit<IBaseTypeDto, '__typename'> {
  id: string

  kind: ITypeKind

  name: string

  constructor({ id, kind, name }: Omit<IBaseTypeDto, '__typename'>) {
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
