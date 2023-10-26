import type { IArrayTypeDTO, IRef } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ArrayType extends BaseType implements IArrayTypeDTO {
  __typename = `${ITypeKind.ArrayType}` as const

  itemType?: IRef

  constructor({ id, itemType, name }: IArrayTypeDTO) {
    super({
      id,
      kind: ITypeKind.ArrayType,
      name,
    })

    this.itemType = itemType
  }
}
