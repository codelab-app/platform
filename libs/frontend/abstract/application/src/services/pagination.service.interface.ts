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

const atoms = RoutePaths.Atoms()
const components = RoutePaths.Components()
const tags = RoutePaths.Tags()
const types = RoutePaths.Type()

export type SupportedPaginationModel = IAtomModel | ITagModel | ITypeModel
export type SupportedPaginationPathname =
  | `${typeof atoms}`
  | `${typeof components}`
  | `${typeof tags}`
  | `${typeof types}`

export interface IPaginationSearchParams {
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
