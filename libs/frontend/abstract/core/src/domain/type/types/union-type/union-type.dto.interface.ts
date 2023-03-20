import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IBaseTypeDTO } from '../base-type'

export interface IUnionTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.UnionType}`
  typesOfUnionType: Array<IEntity>
}
