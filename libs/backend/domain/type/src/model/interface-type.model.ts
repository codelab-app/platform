import type {
  IAtomDTO,
  IAuth0User,
  IFieldDTO,
  IInterfaceTypeDTO,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { v4 } from 'uuid'
import capitalize from 'voca/capitalize'
import { BaseType } from './base-type.model'

export class InterfaceType extends BaseType implements IInterfaceTypeDTO {
  declare __typename: `${ITypeKind.InterfaceType}`

  declare fields: Array<IEntity>

  constructor({ fields = [], id, name }: IInterfaceTypeDTO) {
    super({ id, kind: ITypeKind.InterfaceType, name })

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
  static createFromAtomName(name: string, owner: IAuth0User) {
    return new InterfaceType({
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.getApiName({ name }),
    })
  }
}
