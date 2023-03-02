import type { AppPagesCreateFieldInput } from '@codelab/shared/abstract/codegen'
import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElement, IElementTreeService } from '../element'
import type { IPropData } from '../prop'
import type { IOwnerSchema } from '../user'
import { IAuth0Owner } from '../user'
import type { IPageDTO } from './page.dto.interface'

export interface IPage
  extends IEntity,
    IElementTreeService,
    ICacheService<IPageDTO, IPage> {
  app: IEntity
  name: string
  slug: string
  toJson: IPropData
  rootElement: Ref<IElement>
  getServerSideProps: Nullish<string>
  /**
   * A pointer to tell us where to render from app
   */
  pageContentContainer?: Ref<IElement>
  kind: IPageKind

  toCreateInput(): AppPagesCreateFieldInput
}
