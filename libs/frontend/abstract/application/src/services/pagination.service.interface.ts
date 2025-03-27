import type {
  IAtomModel,
  ITagModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'

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
  expandedKeys?: Array<string>
  filter: Array<string>
  page: number
  pageSize: number
  search?: string
  /**
   * Require key as a result of `TreeViewParams`
   */
  selectedKey: string | undefined
}

export interface IPaginationData {
  totalItems: number
}
