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

export interface IPaginationData {
  totalItems: number
}
