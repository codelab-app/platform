import type { IEntity } from '@codelab/shared/abstract/types'
import type { ITypeKind } from '../type-kind.enum'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IUnionTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.UnionType}`
  // We need kind and name
  typesOfUnionType: Array<Omit<IBaseTypeDTO, 'owner'>>
}
