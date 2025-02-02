import type {
  IAtomDto,
  IFieldDto,
  ITypeRef,
  IUnionTypeDto,
} from '@codelab/shared/abstract/core'

import { ITypeKind } from '@codelab/shared/abstract/core'
import { titleCase } from '@codelab/shared/utils'

import { BaseType } from './base-type.model'

export class UnionType extends BaseType implements IUnionTypeDto {
  static compositeName(
    atom: Pick<IAtomDto, 'name'>,
    field: Pick<IFieldDto, 'key'>,
  ) {
    return `${atom.name} ${titleCase(field.key)} Union API`
  }

  declare __typename: `${ITypeKind.UnionType}`

  typesOfUnionType: Array<ITypeRef>

  constructor({ id, name, owner, typesOfUnionType }: IUnionTypeDto) {
    super({ id, kind: ITypeKind.UnionType, name, owner })

    this.typesOfUnionType = typesOfUnionType
  }
}
