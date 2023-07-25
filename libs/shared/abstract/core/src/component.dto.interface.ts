import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { IAuth0Owner } from './user.interface'

export interface IComponentDTO extends IAuth0Owner {
  api: IEntity
  childrenContainerElement: IEntity
  id: string
  keyGenerator?: Nullish<string>
  name: string
  props: IEntity
  rootElement: IEntity
  store: IEntity
}
