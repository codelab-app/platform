import type { ITypeKind } from '../type-kind.enum'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IEnumTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.EnumType}`
  allowedValues: Array<IEnumTypeValueDTO>
}

export interface IEnumTypeValueDTO {
  id: string
  key: string
  value: string
}
