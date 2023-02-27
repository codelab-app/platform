import type { AppCreateInput } from '@codelab/shared/abstract/codegen'
import type { Ref } from 'mobx-keystone'
import type { IElementTree } from '../element'
import type { IPage } from '../page'
import type { IPropData } from '../prop'
import type { IStore } from '../store'
import type { IAuth0Owner } from '../user'

export interface IApp {
  id: IAppRef
  owner: IAuth0Owner
  name: string
  slug: string
  /**
   * We use ref on something that possible could not exist
   */
  store: Ref<IStore>
  pages: Array<Ref<IPage>>
  toJson: IPropData
  page(id: string): IPage
  toCreateInput(): AppCreateInput
}

export interface IBuilderApp {
  pageElementTree: IElementTree
  app: IApp
  page: IPage
}

export type IAppRef = string
