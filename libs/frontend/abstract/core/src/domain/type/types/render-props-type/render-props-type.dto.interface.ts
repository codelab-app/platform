import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeDTO } from '../base-type'

export interface IRenderPropsTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.RenderPropsType}`
}
