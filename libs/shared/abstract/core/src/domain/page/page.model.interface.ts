import { IEntity } from '@codelab/shared/abstract/types'
import { IElementTreeService } from '../element'

export interface IPage extends IEntity, IElementTreeService {
  app: { id: string }
  name: string
  rootElement: { id: string }
  updateCache(page: any): void
}
