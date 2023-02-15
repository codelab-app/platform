import type {
  IAtom,
  ICreateEnumType,
  IEnumType,
  IEnumTypeValue,
  IField,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import { v4 } from 'uuid'
import { BaseType } from './base-type.model'

export class EnumType extends BaseType implements IEnumType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.EnumType

  declare __typename: `${ITypeKind.EnumType}`

  declare owner: IUserRef

  allowedValues: Array<IEnumTypeValue>

  private constructor({ id, name, kind, allowedValues, owner }: IEnumType) {
    super({ id, name, kind, __typename: ITypeKind.EnumType, owner })
    this.allowedValues = allowedValues
  }

  static init({ name, owner, allowedValues }: ICreateEnumType) {
    return new EnumType({
      id: v4(),
      __typename: ITypeKind.EnumType,
      kind: ITypeKind.EnumType,
      name,
      owner,
      allowedValues,
    })
  }

  static getCompositeName(
    atom: Pick<IAtom, 'name'>,
    field: Pick<IField, 'key'>,
  ) {
    return `${atom.name} ${compoundCaseToTitleCase(field.key)} Enum`
  }
}
