import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeDTO } from '../base-type'

export interface IReactNodeTypeDTO extends IBaseTypeDTO {
  __typename: `${ITypeKind.ReactNodeType}`
}
