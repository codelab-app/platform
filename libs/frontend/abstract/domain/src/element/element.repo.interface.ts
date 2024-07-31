import type { SelectOption } from '@codelab/frontend/abstract/types'
import type {
  DomainOptions,
  ElementFragment,
  ElementWhere,
} from '@codelab/frontend/infra/gql'
import type { IElementTypeKind, IRef } from '@codelab/shared/abstract/core'
import type { IRepository } from '../shared'
import type { IElementModel } from './element.model.interface'
import type { IElementTree } from './element-tree.interface.model'

export interface IElementRepository
  extends IRepository<
    IElementModel,
    ElementFragment,
    ElementWhere,
    DomainOptions
  > {
  updateNodes(element: IElementModel): Promise<IRef>
}

export interface SelectElementOption extends SelectOption {
  childrenIds?: Array<string>
  label: string
  value: string
}

export interface SelectElementOptions {
  allElementOptions?: Array<SelectElementOption>
  elementTree?: IElementTree
  kind: IElementTypeKind
  targetElementId?: string
}
