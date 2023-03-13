import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElement, IElementTree } from '../element'
import type { IPage } from '../page'
import type { IPropData } from '../prop'
import type { IStore } from '../store'
import type { IOwnerSchema } from '../user'
import type { IAppDTO } from './app.dto.interface'

export interface IApp extends ICacheService<IAppDTO, IApp>, IOwnerSchema {
  id: IAppRef
  name: string
  pageRootElements: Array<Ref<IElement>>
  pages: Array<Ref<IPage>>
  /**
   * The `_app.tsx` equivalent of pages
   */
  providerPage: IPage
  slug: string
  /**
   * We use ref on something that possible could not exist
   */
  store: Ref<IStore>
  toJson: IPropData

  page(id: string): IPage
  toCreateInput(): AppCreateInput
  toDeleteInput(): AppDeleteInput
  toUpdateInput(): AppUpdateInput
}

export interface IBuilderApp {
  app: IApp
  page: IPage
  pageElementTree: IElementTree
}

export type IAppRef = string

export interface IAppSchema {
  app: Pick<IApp, 'id'>
}
