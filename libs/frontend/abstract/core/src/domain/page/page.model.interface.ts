import type { IPageKind } from '@codelab/shared/abstract/core'
import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { ICacheService } from '../../service'
import type { IElement, IElementTreeService } from '../element'
import type { IPropData } from '../prop'
import type { IPageDTO } from './page.dto.interface'

export interface IPage extends IEntity, IElementTreeService {
  // ICacheService<IPageDTO, IPage>
  app: IEntity
  name: string
  slug: string
  toJson: IPropData
  rootElement: IEntity
  getServerSideProps: Nullish<string>
  pageContainerElement: Nullish<IEntity>
  kind: IPageKind
}
