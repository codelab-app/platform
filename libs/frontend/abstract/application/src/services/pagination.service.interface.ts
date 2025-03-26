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

import { RoutePaths } from '../shared'

const atoms = RoutePaths.Atom.base()
const components = RoutePaths.Component.base()
const tags = RoutePaths.Tag.base()
const types = RoutePaths.Type.base()

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
