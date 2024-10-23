import type { SelectOption } from '@codelab/frontend/abstract/types'
import type {
  IElementDto,
  IElementTypeKind,
  IRef,
} from '@codelab/shared/abstract/core'
import type {
  DomainOptions,
  ElementCreateInput,
  ElementDeleteInput,
  ElementFragment,
  ElementUpdateInput,
  ElementWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IElementModel } from './element.model.interface'
import type { IElementTree } from './element-tree.interface.model'

export interface IElementRepository
  extends IRepository<
    IElementDto,
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
