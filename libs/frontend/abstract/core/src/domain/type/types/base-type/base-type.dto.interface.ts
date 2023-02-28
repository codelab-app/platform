import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IAuth0Owner } from '../../../user'

export interface IBaseTypeDTO {
  id: string
  name: string
  kind: ITypeKind
  owner: IAuth0Owner
}
