import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeDTO } from '../base-type'

export interface IActionTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.ActionType}`
}
