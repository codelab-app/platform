import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IOwnerSchema } from '../../../user'

export interface IBaseTypeDTO extends IOwnerSchema {
  // __typename: `${ITypeKind}`
  id: string
  kind: ITypeKind
  name: string
}
