import type {
  PageCreateInput,
  PageDeleteInput,
  PageUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElement, IElementTree } from '../element'
import type { IModel } from '../model.interface'
import type { IPropData } from '../prop'
import type { IStore } from '../store'
import type { IPageDTO } from './page.dto.interface'

export interface IPage
  extends IModel<PageCreateInput, PageUpdateInput, PageDeleteInput>,
    IEntity,
    ICacheService<IPageDTO, IPage>,
    IElementTree {
  app: IEntity
  // elementTree: IElementTree
  // Helper getter to get all elements
  elements: Array<IElement>
  kind: IPageKind
  name: string
  // getServerSideProps: Nullish<string>
  /**
   * A pointer to tell us where to render from app
   */
  pageContentContainer?: Nullish<Ref<IElement>>
  rootElement: Ref<IElement>
  slug: string
  store: Ref<IStore>
  toJson: IPropData
}
