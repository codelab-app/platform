import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeDTO } from '../base-type'

export interface IAppTypeDTO extends IBaseTypeDTO {
  __typename?: `${ITypeKind.AppType}`
}
