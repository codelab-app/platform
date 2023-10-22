import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type {
  DomainOptions,
  ElementFragment,
  ElementWhere,
} from '@codelab/shared/abstract/codegen'
import type { IRef } from '@codelab/shared/abstract/core'
import type { IRepository } from '../services'

export interface IElementRepository
  extends IRepository<
    IElementModel,
    ElementFragment,
    ElementWhere,
    DomainOptions
  > {
  updateNodes(element: IElementModel): Promise<IRef>
}
