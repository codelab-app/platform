import type { SelectOption } from '@codelab/frontend-abstract-types'
import type {
  IElementDto,
  IElementTypeKind,
} from '@codelab/shared-abstract-core'
import type {
  DomainOptions,
  ElementFragment,
  ElementWhere,
} from '@codelab/shared-infra-gqlgen'

import type { IRepository } from '../shared'
import type { IElementTree } from './element-tree.interface.model'

export type IElementRepository = IRepository<
  IElementDto,
  ElementFragment,
  ElementWhere,
  DomainOptions
>

export interface SelectElementOption extends SelectOption {
  childrenIds?: Array<string>
}

export interface SelectElementOptions {
  elementOptions?: Array<SelectElementOption>
  elementTree?: IElementTree
  kind: IElementTypeKind
  targetElementId?: string
}
