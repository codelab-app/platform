import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElementTree } from '../element'
import type { IPage } from '../page'
import type { IPropData } from '../prop'
import type { IStore } from '../store'
import type { IAppDTO } from './app.dto.interface'

export interface IApp extends ICacheService<IAppDTO, IApp> {
  id: IAppRef
  ownerId: string
  name: string
  slug: string
  store: Ref<IStore>
  pages: Array<Ref<IPage>>
  toJson: IPropData
}

export interface IBuilderApp {
  pageElementTree: IElementTree
  app: IApp
  page: IPage
}

export type IAppRef = string
