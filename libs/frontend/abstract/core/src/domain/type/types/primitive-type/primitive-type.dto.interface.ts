import type { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeDTO } from '../base-type'

export interface IPrimitiveTypeDTO extends IBaseTypeDTO {
  __typename: `${ITypeKind.PrimitiveType}`
  primitiveKind: PrimitiveTypeKind
}
