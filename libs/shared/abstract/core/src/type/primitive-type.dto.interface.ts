import type { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '../type-kind.enum'
import type { IBaseTypeDTO } from './base-type.dto.interface'

export interface IPrimitiveTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.PrimitiveType}`
  primitiveKind: PrimitiveTypeKind
}
