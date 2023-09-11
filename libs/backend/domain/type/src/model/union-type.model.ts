import type {
  IAtomDTO,
  IFieldDTO,
  ITypeEntity,
  IUnionTypeDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { BaseType } from './base-type.model'

export class UnionType extends BaseType implements IUnionTypeDTO {
  declare __typename: `${ITypeKind.UnionType}`

  typesOfUnionType: Array<ITypeEntity>

  constructor({ id, name, typesOfUnionType }: IUnionTypeDTO) {
    super({ id, kind: ITypeKind.UnionType, name })

    this.typesOfUnionType = typesOfUnionType
  }

  static compositeName(
    atom: Pick<IAtomDTO, 'name'>,
    field: Pick<IFieldDTO, 'key'>,
  ) {
    return `${atom.name} ${compoundCaseToTitleCase(field.key)} Union API`
  }
}
