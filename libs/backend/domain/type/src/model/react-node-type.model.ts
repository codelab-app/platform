import type {
  ICreateReactNodeType,
  IReactNodeType,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { BaseType } from './base-type.model'

export class ReactNodeType extends BaseType implements IReactNodeType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ReactNodeType

  declare __typename: `${ITypeKind.ReactNodeType}`

  declare owner: IUserRef

  private constructor({ id, name, kind, owner }: IReactNodeType) {
    super({ __typename: ITypeKind.ReactNodeType, id, kind, name, owner })
  }

  static init({ owner }: ICreateReactNodeType) {
    return new ReactNodeType({
      __typename: ITypeKind.ReactNodeType,
      id: v4(),
      kind: ITypeKind.ReactNodeType,
      name: ITypeKind.ReactNodeType,
      owner,
    })
  }
  // static seedData(user: IUserRef): IReactNodeType {
  //   return new ReactNodeType({
  //     id: v4(),
  //     __typename: ITypeKind.ReactNodeType,
  //     kind: ITypeKind.ReactNodeType,
  //     name: ITypeKind.ReactNodeType,
  //     owner: user,
  //   })
  // }
}
