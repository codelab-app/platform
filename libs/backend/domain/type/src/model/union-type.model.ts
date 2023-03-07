import type {
  IAtom,
  ICreateUnionType,
  IField,
  IUnionType,
  IOwner,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { BaseType } from './base-type.model'

export class UnionType extends BaseType implements IUnionType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.UnionType

  declare __typename: `${ITypeKind.UnionType}`

  declare owner: IOwner

  typesOfUnionType: Array<IEntity>

  private constructor({ id, name, kind, owner, typesOfUnionType }: IUnionType) {
    super({ __typename: ITypeKind.UnionType, id, kind, name, owner })
    this.typesOfUnionType = typesOfUnionType
  }

  static init({ owner, name, typesOfUnionType }: ICreateUnionType) {
    return new UnionType({
      __typename: ITypeKind.UnionType,
      id: v4(),
      kind: ITypeKind.UnionType,
      name,
      owner,
      typesOfUnionType,
    })
  }

  static compositeName(atom: Pick<IAtom, 'name'>, field: Pick<IField, 'key'>) {
    return `${atom.name} ${compoundCaseToTitleCase(field.key)} Union API`
  }
}
