import type { ITypeKind } from '../type-kind.enum'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IAppTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.AppType}`
}
