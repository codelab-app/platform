import type { IEntity } from '@codelab/shared/abstract/types'
import type { ITypeKind } from '../type-kind.enum'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IArrayTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.ArrayType}`
  itemType?: IEntity
}
