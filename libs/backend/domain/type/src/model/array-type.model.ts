import type { IArrayTypeDTO } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { BaseType } from './base-type.model'

export class ArrayType extends BaseType implements IArrayTypeDTO {
  declare __typename: `${ITypeKind.ArrayType}`

  itemType?: IEntity

  constructor({ id, itemType, name }: IArrayTypeDTO) {
    super({ id, kind: ITypeKind.ArrayType, name })

    this.itemType = itemType
  }
}
