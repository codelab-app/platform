import type {
  IAtomDTO,
  IAuth0Owner,
  IFieldDTO,
  IInterfaceTypeDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { v4 } from 'uuid'
import { capitalize } from 'voca'
import { BaseType } from './base-type.model'

export class InterfaceType extends BaseType implements IInterfaceTypeDTO {
  declare id: string

  declare name: string

  declare kind: ITypeKind.InterfaceType

  declare __typename: `${ITypeKind.InterfaceType}`

  declare owner: IAuth0Owner

  fields: Array<IEntity>

  constructor({ fields, id, name, owner }: IInterfaceTypeDTO) {
    super({ id, kind: ITypeKind.InterfaceType, name, owner })

    this.fields = fields
  }

  static getApiName(
    { name }: Pick<IAtomDTO, 'name'>,
    field?: Pick<IFieldDTO, 'key'>,
  ) {
    return field?.key ? `${name} ${capitalize(field.key)} API` : `${name} API`
  }

  /**
   * Make create data from atom name
   */
  static createFromAtomName(name: string, owner: IAuth0Owner) {
    return new InterfaceType({
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.getApiName({ name }),
      owner,
    })
  }
}
