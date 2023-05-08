import type { ITypeKind } from '../type-kind.enum'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IReactNodeTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.ReactNodeType}`
}
