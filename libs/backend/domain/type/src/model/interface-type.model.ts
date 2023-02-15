import type {
  IAtom,
  ICreateInterfaceType,
  IField,
  IInterfaceType,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { BaseType } from './base-type.model'

export class InterfaceType extends BaseType implements IInterfaceType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.InterfaceType

  declare __typename: `${ITypeKind.InterfaceType}`

  declare owner: IUserRef

  fields: Array<IField>

  private constructor({ id, name, kind, fields, owner }: IInterfaceType) {
    super({ id, name, kind, __typename: ITypeKind.InterfaceType, owner })
    this.fields = fields
  }

  static getApiName(
    { name }: Pick<IAtom, 'name'>,
    field?: Pick<IField, 'key'>,
  ) {
    return field?.key ? `${name} ${field.key} API` : `${name} API`
  }

  static init({ owner, name, fields }: ICreateInterfaceType) {
    return new InterfaceType({
      id: v4(),
      __typename: ITypeKind.InterfaceType,
      kind: ITypeKind.InterfaceType,
      name,
      owner,
      fields,
    })
  }

  /**
   * Make create data from atom name
   */
  static createFromAtomName(name: string, owner: IUserRef): IInterfaceType {
    return new InterfaceType({
      id: v4(),
      name: InterfaceType.getApiName({ name }),
      kind: ITypeKind.InterfaceType,
      fields: [],
      owner,
    })
  }
}
