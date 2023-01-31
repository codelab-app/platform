import type {
  IAtom,
  IField,
  IInterfaceType,
  IUserRef,
} from '@codelab/backend/abstract/core'
import type { IModel } from '@codelab/backend/abstract/types'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseUniqueWhere } from '@codelab/shared/abstract/types'
import { v4 } from 'uuid'
import { BaseType } from './base-type.model'

export class InterfaceType extends BaseType implements IInterfaceType {
  declare id: string

  declare name: string

  declare kind: ITypeKind.InterfaceType

  declare __typename: `${ITypeKind.InterfaceType}`

  declare owner: IUserRef

  fields: Array<IField>

  constructor({ id, name, kind, fields, owner }: IInterfaceType) {
    super({ id, name, kind, __typename: ITypeKind.InterfaceType, owner })
    this.fields = fields
  }

  static getApiName({ name }: Pick<IAtom, 'name'>) {
    return `${name} API`
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
