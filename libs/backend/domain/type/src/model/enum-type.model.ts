import type {
  IAtomDto,
  IEnumTypeDto,
  IEnumTypeValueDto,
  IFieldDto,
} from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'
import { titleCase } from '@codelab/shared/utils'

import { BaseType } from './base-type.model'

export class EnumType extends BaseType implements IEnumTypeDto {
  static compositeName(
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ) {
    return `${atom.name} ${titleCase(field.key)} Enum`
  }

  declare __typename: `${ITypeKind.EnumType}`

  allowedValues: Array<IEnumTypeValueDto>

  constructor({ allowedValues, id, name }: IEnumTypeDto) {
    super({ id, kind: ITypeKind.EnumType, name })

    this.allowedValues = allowedValues
  }
}
