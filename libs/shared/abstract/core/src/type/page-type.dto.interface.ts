import type { ITypeKind } from '../type-kind.enum'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IPageTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.PageType}`
}
