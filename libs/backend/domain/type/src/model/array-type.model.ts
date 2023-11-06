import type { IArrayTypeDTO, IRef } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ArrayType extends BaseType implements IArrayTypeDTO {
  declare __typename: `${ITypeKind.ArrayType}`

  itemType?: IRef

  constructor({ id, itemType, name }: IArrayTypeDTO) {
    // @ts-ignore
    super({ id, kind: ITypeKind.ArrayType, name })

    this.itemType = itemType
  }
}
