import type {
  ICreateUnionType,
  IField,
  IOwner,
  IUnionType,
} from '@codelab/backend/abstract/core'
import type { IAtomDTO } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { BaseType } from './base-type.model'

export class UnionType extends BaseType implements IUnionType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.UnionType

  declare __typename: `${ITypeKind.UnionType}`

  declare owner: IOwner

  typesOfUnionType: Array<IEntity>

  private constructor({ id, kind, name, owner, typesOfUnionType }: IUnionType) {
    super({ __typename: ITypeKind.UnionType, id, kind, name, owner })
    this.typesOfUnionType = typesOfUnionType
  }

  static init({ id, name, owner, typesOfUnionType }: ICreateUnionType) {
    return new UnionType({
      __typename: ITypeKind.UnionType,
      id,
      kind: ITypeKind.UnionType,
      name,
      owner,
      typesOfUnionType,
    })
  }

  static compositeName(
    atom: Pick<IAtomDTO, 'name'>,
    field: Pick<IField, 'key'>,
  ) {
    return `${atom.name} ${compoundCaseToTitleCase(field.key)} Union API`
  }
}
