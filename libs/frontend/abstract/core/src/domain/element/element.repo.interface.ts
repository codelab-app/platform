import type {
  DomainOptions,
  ElementFragment,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { IElement } from './element.model.interface'

export interface IElementRepository
  extends IRepository<IElement, ElementFragment, ElementWhere, DomainOptions> {
  updateNodes(element: IElement): Promise<IEntity>
}
