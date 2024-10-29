import type { IArrayTypeDto, IRef } from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'

import { BaseType } from './base-type.model'

export class ArrayType extends BaseType implements IArrayTypeDto {
  __typename = ITypeKind.ArrayType as const

  itemType?: IRef

  constructor({ id, itemType, name, owner }: IArrayTypeDto) {
    super({
      id,
      kind: ITypeKind.ArrayType,
      name,
      owner,
    })

    this.itemType = itemType
  }
}
