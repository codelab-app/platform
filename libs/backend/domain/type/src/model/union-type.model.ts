import type {
  IAtom,
  ICreateUnionType,
  IField,
  IUnionType,
  IUserRef,
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

  declare owner: IUserRef

  typesOfUnionType: Array<IEntity>

  private constructor({ id, name, kind, owner, typesOfUnionType }: IUnionType) {
    super({ id, name, kind, __typename: ITypeKind.UnionType, owner })
    this.typesOfUnionType = typesOfUnionType
  }

  static init({ owner, name, typesOfUnionType }: ICreateUnionType) {
    return new UnionType({
      id: v4(),
      __typename: ITypeKind.UnionType,
      name,
      kind: ITypeKind.UnionType,
      owner,
      typesOfUnionType,
    })
  }

  static compositeName(atom: Pick<IAtom, 'name'>, field: Pick<IField, 'key'>) {
    return `${atom.name} ${compoundCaseToTitleCase(field.key)} Union API`
  }
}
