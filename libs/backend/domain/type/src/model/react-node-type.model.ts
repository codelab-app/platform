import type {
  IField,
  IInterfaceType,
  IReactNodeType,
  IUserRef,
} from '@codelab/backend/abstract/core'
import type { IModel } from '@codelab/backend/abstract/types'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { BaseType } from './base-type.model'

export class ReactNodeType extends BaseType implements IReactNodeType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ReactNodeType

  declare __typename: `${ITypeKind.ReactNodeType}`

  declare owner: IUserRef

  constructor({ id, name, kind, owner }: IReactNodeType) {
    super({ id, name, kind, __typename: ITypeKind.ReactNodeType, owner })
  }
}
