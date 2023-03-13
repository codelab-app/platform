import type {
  ICreateReactNodeType,
  IOwner,
  IReactNodeType,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ReactNodeType extends BaseType implements IReactNodeType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ReactNodeType

  declare __typename: `${ITypeKind.ReactNodeType}`

  declare owner: IOwner

  private constructor({ id, name, kind, owner }: IReactNodeType) {
    super({ __typename: ITypeKind.ReactNodeType, id, kind, name, owner })
  }

  static init({ id, owner }: ICreateReactNodeType) {
    return new ReactNodeType({
      __typename: ITypeKind.ReactNodeType,
      id,
      kind: ITypeKind.ReactNodeType,
      name: ITypeKind.ReactNodeType,
      owner,
    })
  }
}
