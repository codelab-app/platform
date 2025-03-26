import type {
  IAtomModel,
  IComponentModel,
  ITagModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import type {
  IAtomDto,
  IAtomType,
  IComponentDto,
  ITagDto,
  ITypeDto,
} from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

import { NewRoutePaths } from '../shared'

const atoms = NewRoutePaths.Atom.base()
const components = NewRoutePaths.Component.base()
const tags = NewRoutePaths.Tag.base()
const types = NewRoutePaths.Type.base()

export type SupportedPaginationModel = IAtomModel | ITagModel | ITypeModel
export type SupportedPaginationPathname =
  | `${typeof atoms}`
  | `${typeof components}`
  | `${typeof tags}`
  | `${typeof types}`

export interface IPaginationSearchParams {
  expandedNodes?: Array<string>
  filter: string
  page: number
  pageSize: number
  search?: string
  // Selected node
  selectedKey?: string
}

export interface IPaginationData {
  totalItems: number
}
