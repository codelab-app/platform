import type {
  IAtomDTO,
  IAuth0Owner,
  IEnumTypeDTO,
  IEnumTypeValueDTO,
  IFieldDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { BaseType } from './base-type.model'

export class EnumType extends BaseType implements IEnumTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.EnumType

  declare __typename: `${ITypeKind.EnumType}`

  declare owner: IAuth0Owner

  allowedValues: Array<IEnumTypeValueDTO>

  constructor({ allowedValues, id, name, owner }: IEnumTypeDTO) {
    super({ id, kind: ITypeKind.EnumType, name, owner })

    this.allowedValues = allowedValues
  }

  static getCompositeName(
    atom: Pick<IAtomDTO, 'name'>,
    field: Pick<IFieldDTO, 'key'>,
  ) {
    return `${atom.name} ${compoundCaseToTitleCase(field.key)} Enum`
  }
}
