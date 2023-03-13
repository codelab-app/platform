import type {
  ICreateInterfaceType,
  IField,
  IInterfaceType,
  IOwner,
} from '@codelab/backend/abstract/core'
import type {
  IAtomDTO,
  IInterfaceTypeDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { BaseType } from './base-type.model'

export class InterfaceType extends BaseType implements IInterfaceType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.InterfaceType

  declare __typename: `${ITypeKind.InterfaceType}`

  declare owner: IOwner

  fields: Array<IField>

  private constructor({ fields, id, kind, name, owner }: IInterfaceType) {
    super({ __typename: ITypeKind.InterfaceType, id, kind, name, owner })
    this.fields = fields
  }

  static getApiName(
    { name }: Pick<IAtomDTO, 'name'>,
    field?: Pick<IField, 'key'>,
  ) {
    return field?.key ? `${name} ${field.key} API` : `${name} API`
  }

  static init({ fields, id, name, owner }: ICreateInterfaceType) {
    return new InterfaceType({
      __typename: ITypeKind.InterfaceType,
      fields,
      id,
      kind: ITypeKind.InterfaceType,
      name,
      owner,
    })
  }

  /**
   * Make create data from atom name
   */
  static createFromAtomName(name: string, owner: IOwner) {
    return new InterfaceType({
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.getApiName({ name }),
      owner,
    })
  }
}
