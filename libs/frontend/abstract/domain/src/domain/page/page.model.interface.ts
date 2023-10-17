import type {
  PageCreateInput,
  PageDeleteInput,
  PageUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IPage, IPageDTO } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IAuthGuardModel } from '../auth-guard'
import type { IElementModel, IElementTree } from '../element'
import type { IModel } from '../model.interface'
import type { IStoreModel } from '../store'

export interface IPageModel
  extends IModel<PageCreateInput, PageUpdateInput, PageDeleteInput>,
    IEntity,
    ICacheService<IPageDTO, IPageModel>,
    IElementTree,
    IPage {
  authGuard?: Nullish<Ref<IAuthGuardModel>>
  // elementTree: IElementTree
  // Helper getter to get all elements
  elements: Array<IElementModel>
  /**
   * A pointer to tell us where to render from app
   */
  pageContentContainer?: Nullish<Ref<IElementModel>>
  rootElement: Ref<IElementModel>
  store: Ref<IStoreModel>
  toJson: IPage
}
