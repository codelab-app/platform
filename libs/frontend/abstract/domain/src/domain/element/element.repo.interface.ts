import type {
  DomainOptions,
  ElementFragment,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { IElementModel } from './element.model.interface'

export interface IElementRepository
  extends IRepository<
    IElementModel,
    ElementFragment,
    ElementWhere,
    DomainOptions
  > {
  updateNodes(element: IElementModel): Promise<IEntity>
}
