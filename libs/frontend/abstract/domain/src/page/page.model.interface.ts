import type { IPageDto, IPageKind } from '@codelab/shared-abstract-core'
import type { Maybe, Nullish } from '@codelab/shared-abstract-types'
import type { Ref } from 'mobx-keystone'

import type { IAppModel } from '../app'
import type { IElementModel, IElementTree } from '../element'
import type { IRedirectModel } from '../redirect'
import type { IModel } from '../shared'
import type { IStoreModel } from '../store'

export interface IPageModel extends IElementTree, IModel<IPageDto, IPageModel> {
  app: Ref<IAppModel>
  elements: Array<IElementModel>
  /**
   * a pre-computed descendant elements ids
   * mainly used for deletePageUseCase to avoid element hydrating
   */
  elementsIds: Array<string>
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
  redirect?: Ref<IRedirectModel>
  rootElement: Ref<IElementModel>
  slug: string
  store: Ref<IStoreModel>
  /**
   * This is the URL pattern
   */
  urlPattern: string
}
