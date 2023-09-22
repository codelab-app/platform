import type {
  IAtomDTO,
  IEnumTypeDTO,
  IEnumTypeValueDTO,
  IFieldDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { BaseType } from './base-type.model'

export class EnumType extends BaseType implements IEnumTypeDTO {
  static compositeName(
    atom: Pick<IAtomDTO, 'name'>,
    field: Pick<IFieldDTO, 'key'>,
  ) {
    return `${atom.name} ${compoundCaseToTitleCase(field.key)} Enum`
  }

  declare __typename: `${ITypeKind.EnumType}`

  allowedValues: Array<IEnumTypeValueDTO>

  constructor({ allowedValues, id, name }: IEnumTypeDTO) {
    super({ id, kind: ITypeKind.EnumType, name })

    this.allowedValues = allowedValues
  }
}
