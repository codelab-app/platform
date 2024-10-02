import type {
  IAtomDto,
  IFieldDto,
  IInterfaceTypeDto,
  IRef,
} from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'
import { createInterfaceTypeName } from '@codelab/shared/domain'
import { capitalCase } from 'change-case-all'
import { v4 } from 'uuid'

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

  static createName = createInterfaceTypeName

  static getApiName(
    { name }: Pick<IAtomDto, 'name'>,
    field?: Pick<IFieldDto, 'key'>,
  ) {
    return field?.key ? `${name} ${capitalCase(field.key)} API` : `${name} API`
  }

  __typename = ITypeKind.InterfaceType as const

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
