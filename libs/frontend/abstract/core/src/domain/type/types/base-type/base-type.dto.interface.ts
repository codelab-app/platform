import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IOwnerSchema } from '../../../user'

export interface IBaseTypeDTO extends IOwnerSchema {
  id: string
  kind: ITypeKind
  name: string
}
