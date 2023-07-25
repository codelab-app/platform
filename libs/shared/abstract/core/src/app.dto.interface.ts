import type { IEntity } from '@codelab/shared/abstract/types'
import type { IAuth0Owner } from './user.interface'

export interface IAppDTO extends IAuth0Owner {
  domains?: Array<IEntity>
  id: string
  name: string
  pages?: Array<IEntity>
}
