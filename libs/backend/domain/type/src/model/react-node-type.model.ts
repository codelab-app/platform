import type { IReactNodeTypeDTO } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { BaseType } from './base-type.model'

export class ReactNodeType extends BaseType implements IReactNodeTypeDTO {
  declare __typename: `${ITypeKind.ReactNodeType}`

  constructor({ id }: IReactNodeTypeDTO) {
    super({
      id,
      kind: ITypeKind.ReactNodeType,
      name: ITypeKind.ReactNodeType,
    })
  }
}
