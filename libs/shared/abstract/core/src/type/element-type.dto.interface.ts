import type { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '../type-kind.enum'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IElementTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.ElementType}`
  elementKind: ElementTypeKind
}
