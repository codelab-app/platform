import { IEntity, Nullable } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { IPage } from '../page'

export interface IApp {
  id: IAppRef
  ownerId: string
  name: string
  store: Nullable<IEntity>
  pages: Array<Ref<IPage>>
}

export type IAppRef = string
