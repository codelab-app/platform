import type {
  PageCreateInput,
  PageDeleteInput,
  PageUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IPage, IPageDTO, IPageKind } from '@codelab/shared/abstract/core'
import type { Maybe, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IAppModel } from '../app'
import type { IElementModel, IElementTree } from '../element'
import type { IRedirectModel } from '../redirect'
import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'
import type { IStoreModel } from '../store'

export interface IPageModel
  extends IModel<PageCreateInput, PageUpdateInput, PageDeleteInput, IPage>,
    ICacheService<IPageDTO, IPageModel>,
    IElementTree {
  app: Ref<IAppModel>
  elements: Array<IElementModel>
  kind: IPageKind
  name: string
  /**
   * A pointer to tell us where to render from app
   */
  pageContentContainer?: Nullish<Ref<IElementModel>>
  providerPage: Maybe<IPageModel>
  /**
   * computed property which return a redirect if there is one attached to page
   * because redirect maybe added/updated/deleted without changing page
   */
  redirect?: IRedirectModel
  rootElement: Ref<IElementModel>
  slug: string
  store: Ref<IStoreModel>
  url: string
}
