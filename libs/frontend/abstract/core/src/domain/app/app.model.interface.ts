import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IDomain } from '../domain'
import type { IElement } from '../element'
import type { IModel } from '../model.interface'
import type { IPage } from '../page'
import type { IPropData } from '../prop'

export interface IApp
  extends IModel<AppCreateInput, AppUpdateInput, AppDeleteInput>,
    ICacheService<IAppDTO, IApp> {
  domains: Array<Ref<IDomain>>
  id: IAppRef
  name: string
  pageRootElements: Array<Ref<IElement>>
  pages: Array<Ref<IPage>>
  /**
   * The `_app.tsx` equivalent of pages
   */
  providerPage: IPage
  slug: string
  toJson: IPropData

  page(id: string): IPage
}

export interface IBuilderApp {
  app: IApp
  page: IPage
}

export type IAppRef = string

export interface IAppSchema {
  app: IEntity
}
