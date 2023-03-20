import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeDTO } from '../base-type'

export interface IPageTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.PageType}`
}
