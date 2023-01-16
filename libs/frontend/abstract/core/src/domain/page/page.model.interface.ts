import type { IEntity, Nullish } from '@codelab/shared/abstract/types'
import type { ICacheService } from '../../service'
import type { IElementTreeService } from '../element'
import type { IPropData } from '../prop'
import type { IPageDTO } from './page.dto.interface'

export interface IPage
  extends IEntity,
    IElementTreeService,
    ICacheService<IPageDTO, IPage> {
  app: IEntity
  name: string
  slug: string
  toJson: IPropData
  rootElement: IEntity
  getServerSideProps: Nullish<string>
  isProvider: boolean
  pageContainerElementId: Nullish<string>
}
