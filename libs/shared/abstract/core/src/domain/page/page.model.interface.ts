import { IEntity } from '@codelab/shared/abstract/types'
import { ICacheService } from '../../service'
import { IElementTreeService } from '../element'
import { IPageDTO } from './page.dto.interface'

export interface IPage
  extends IEntity,
    IElementTreeService,
    ICacheService<IPageDTO, IPage> {
  app: { id: string }
  name: string
  slug: string
  rootElement: { id: string }
}
