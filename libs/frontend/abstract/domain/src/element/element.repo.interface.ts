import type {
  DomainOptions,
  ElementFragment,
  ElementWhere,
} from '@codelab/frontend/infra/gql'
import type { IRef } from '@codelab/shared/abstract/core'
import type { IRepository } from '../shared'
import type { IElementModel } from './element.model.interface'

export interface IElementRepository
  extends IRepository<
    IElementModel,
    ElementFragment,
    ElementWhere,
    DomainOptions
  > {
  updateNodes(element: IElementModel): Promise<IRef>
}
