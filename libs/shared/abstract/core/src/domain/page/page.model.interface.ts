import { IEntity } from '@codelab/shared/abstract/types'
import { IElementTreeService } from '../element'

export interface IPage extends IEntity, IElementTreeService {
  app: { id: string }
  name: string
  slug: string
  rootElement: { id: string }
}
