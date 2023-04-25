import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeDTO } from '../base-type'

export interface IRenderPropTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.RenderPropType}`
}
