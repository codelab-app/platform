import type {
  IAtomModel,
  IComponentModel,
  ITagModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IAtomService } from '../atom'
import type { IComponentService } from '../component'
import type { ITagService } from '../tag'
import type { ITypeService } from '../type'

/**
 * The interface of the shape of data we want to filter
 *
 * For data like
 *
 * { name: 'Codelab' }
 *
 * we will use { name: string }
 */
export type Filterables = NameFilter

export interface NameFilter {
  name?: string
}

export type SupportedPaginationModel =
  | IAtomModel
  | IComponentModel
  | ITagModel
  | ITypeModel

const atoms = PageType.Atoms()
const components = PageType.Components()
const tags = PageType.Tags()
const types = PageType.Type()

export type SupportedPaginationModelPage =
  | typeof atoms
  | typeof components
  | typeof tags
  | typeof types

export type SupportedPaginationModelService =
  | IAtomService
  | IComponentService
  | ITagService
  | ITypeService

export interface IPaginateable<
  T extends SupportedPaginationModel,
  U extends Filterables,
> {
  paginationService: IPaginationService<T, U>
}

export type GetDataFn = <
  T extends SupportedPaginationModel,
  U extends Filterables,
>(
  page: number,
  pageSize: number,
  filter: U,
) => Promise<{ items: Array<T>; totalItems: number }>

export interface IPaginationService<
  T extends SupportedPaginationModel,
  U extends Filterables,
> {
  data: Array<T>
  dataRefs: Map<string, Ref<T>>
  isLoading: boolean
  totalItems: number
  totalPages: number

  getData(): Promise<Array<T>>
}
