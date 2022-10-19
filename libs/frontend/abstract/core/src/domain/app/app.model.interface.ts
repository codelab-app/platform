import { Ref } from 'mobx-keystone'
import { ICacheService } from '../../service'
import { IElementTree } from '../element'
import { IPage } from '../page'
import { IPropData } from '../prop'
import { IStore } from '../store'
import { IAppDTO } from './app.dto.interface'

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
