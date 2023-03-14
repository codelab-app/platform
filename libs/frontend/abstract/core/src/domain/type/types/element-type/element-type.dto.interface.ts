import type { ElementTypeKind } from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeDTO } from '../base-type'

export interface IElementTypeDTO extends IBaseTypeDTO {
  __typename: `${ITypeKind.ElementType}`
  elementKind: ElementTypeKind
}
