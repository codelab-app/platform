import { IEntity, Nullable } from '@codelab/shared/abstract/types'

export interface IApp {
  id: IAppRef
  ownerId: string
  name: string
  store: Nullable<IEntity>
}

export type IAppRef = string
