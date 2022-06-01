import { IEntity } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import { IElementTreeService } from '../element'
import { IPage } from '../page'

export interface IApp extends IElementTreeService {
  id: IAppRef
  ownerId: string
  name: string
  store: IEntity
  pages: Array<Ref<IPage>>
  rootElement: IEntity
}

export type IAppRef = string
