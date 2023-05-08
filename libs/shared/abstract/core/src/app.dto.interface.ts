import type { IEntity } from '@codelab/shared/abstract/types'
import type { IOwner } from './user.interface'

export interface IAppDTO extends IOwner {
  domains?: Array<IEntity>
  id: string
  name: string
  pages?: Array<IEntity>
}
