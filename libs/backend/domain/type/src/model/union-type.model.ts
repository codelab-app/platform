import type {
  IAtomDTO,
  IAuth0Owner,
  IFieldDTO,
  IUnionTypeDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { BaseType } from './base-type.model'

export class UnionType extends BaseType implements IUnionTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.UnionType

  declare __typename: `${ITypeKind.UnionType}`

  declare owner: IAuth0Owner

  typesOfUnionType: Array<IEntity>

  constructor({ id, name, owner, typesOfUnionType }: IUnionTypeDTO) {
    super({ id, kind: ITypeKind.UnionType, name, owner })

    this.typesOfUnionType = typesOfUnionType
  }

  static compositeName(
    atom: Pick<IAtomDTO, 'name'>,
    field: Pick<IFieldDTO, 'key'>,
  ) {
    return `${atom.name} ${compoundCaseToTitleCase(field.key)} Union API`
  }
}
