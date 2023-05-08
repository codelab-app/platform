import type {
  IAuth0Owner,
  IReactNodeTypeDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ReactNodeType extends BaseType implements IReactNodeTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ReactNodeType

  declare __typename: `${ITypeKind.ReactNodeType}`

  declare owner: IAuth0Owner

  constructor({ id, owner }: IReactNodeTypeDTO) {
    super({
      id,
      kind: ITypeKind.ReactNodeType,
      name: ITypeKind.ReactNodeType,
      owner,
    })
  }
}
