import type {
  IAtomDTO,
  IFieldDTO,
  ITypeMaybeRef,
  IUnionTypeDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { BaseType } from './base-type.model'

export class UnionType extends BaseType implements IUnionTypeDTO {
  static compositeName(
    atom: Pick<IAtomDTO, 'name'>,
    field: Pick<IFieldDTO, 'key'>,
  ) {
    return `${atom.name} ${compoundCaseToTitleCase(field.key)} Union API`
  }

  declare __typename: `${ITypeKind.UnionType}`

  typesOfUnionType: Array<ITypeMaybeRef>

  constructor({ id, name, typesOfUnionType }: IUnionTypeDTO) {
    // @ts-ignore
    super({ id, kind: ITypeKind.UnionType, name })

    this.typesOfUnionType = typesOfUnionType
  }
}
