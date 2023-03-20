import type {
  IArrayTypeDTO,
  IAuth0Owner,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { BaseType } from './base-type.model'

export class ArrayType extends BaseType implements IArrayTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.ArrayType

  declare __typename: `${ITypeKind.ArrayType}`

  declare owner: IAuth0Owner

  declare itemType?: IEntity

  constructor({ id, itemType, name, owner }: IArrayTypeDTO) {
    super({ id, kind: ITypeKind.ArrayType, name, owner })

    this.itemType = itemType
  }
}
