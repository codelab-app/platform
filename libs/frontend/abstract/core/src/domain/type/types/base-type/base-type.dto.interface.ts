import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IAuth0Owner, IOwnerSchema } from '../../../user'

export interface IBaseTypeDTO extends IOwnerSchema {
  id: string
  name: string
  kind: ITypeKind
}
