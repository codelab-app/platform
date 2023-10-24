import type {
  PageCreateInput,
  PageDeleteInput,
  PageUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IPage,
  IPageDTO,
  IPageKind,
  IRef,
} from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IElementModel, IElementTree } from '../element'
import type { ICacheService } from '../shared'
import type { IModel } from '../shared/models/model.interface'
import type { IStoreModel } from '../store'

export interface IPageModel
  extends IModel<PageCreateInput, PageUpdateInput, PageDeleteInput, IPage>,
    ICacheService<IPageDTO, IPageModel>,
    IElementTree {
  app: IRef
  elements: Array<IElementModel>
  kind: IPageKind
  name: string
  /**
   * A pointer to tell us where to render from app
   */
  pageContentContainer?: Nullish<Ref<IElementModel>>
  rootElement: Ref<IElementModel>
  slug: string
  store: Ref<IStoreModel>
  url: string
}
