import type {
  IAtomDTO,
  IFieldDTO,
  IInterfaceTypeDTO,
  IRef,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import capitalize from 'voca/capitalize'
import { BaseType } from './base-type.model'

export class InterfaceType extends BaseType implements IInterfaceTypeDTO {
  /**
   * Make create data from atom name
   */
  static createFromAtomName(name: string) {
    return new InterfaceType({
      __typename: ITypeKind.InterfaceType,
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: InterfaceType.getApiName({ name }),
    })
  }

  static getApiName(
    { name }: Pick<IAtomDTO, 'name'>,
    field?: Pick<IFieldDTO, 'key'>,
  ) {
    return field?.key ? `${name} ${capitalize(field.key)} API` : `${name} API`
  }

  __typename = `${ITypeKind.InterfaceType}` as const

  fields: Array<IRef>

  constructor({ fields = [], id, name }: IInterfaceTypeDTO) {
    super({
      id,
      kind: ITypeKind.InterfaceType,
      name,
    })

    this.fields = fields
  }
}
