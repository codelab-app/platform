import type {
  IAtomDto,
  IFieldDto,
  IInterfaceTypeDto,
  IRef,
} from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { createInterfaceTypeName } from '@codelab/shared/domain/model'
import { v4 } from 'uuid'
import capitalize from 'voca/capitalize'
import { BaseType } from './base-type.model'

export class InterfaceType extends BaseType implements IInterfaceTypeDto {
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
    { name }: Pick<IAtomDto, 'name'>,
    field?: Pick<IFieldDto, 'key'>,
  ) {
    return field?.key ? `${name} ${capitalize(field.key)} API` : `${name} API`
  }

  static createName = createInterfaceTypeName

  __typename = `${ITypeKind.InterfaceType}` as const

  fields: Array<IRef>

  constructor({ fields = [], id, name }: IInterfaceTypeDto) {
    super({
      id,
      kind: ITypeKind.InterfaceType,
      name,
    })

    this.fields = fields
  }
}
