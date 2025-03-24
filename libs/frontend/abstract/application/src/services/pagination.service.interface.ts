import type {
  IAtomModel,
  IComponentModel,
  ITagModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import type {
  IAtomDto,
  IComponentDto,
  ITagDto,
  ITypeDto,
} from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

import { PageType } from '../shared'

const atoms = PageType.Atoms()
const components = PageType.Components()
const tags = PageType.Tags()
const types = PageType.Type()

export type SupportedPaginationPathname =
  | `${typeof atoms}`
  | `${typeof components}`
  | `${typeof tags}`
  | `${typeof types}`

export interface IPaginationSearchParams {
  filter: string
  page: number
  pageSize: number
}

export interface IPaginationData {
  totalItems: number
}
