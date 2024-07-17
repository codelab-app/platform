import type {
  IAtomModel,
  IComponentModel,
  ITagModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import type { PageType } from '@codelab/frontend/abstract/types'
import type { AtomFragment } from '@codelab/frontend/infra/gql'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IAtomService } from '../atom'
import type { IComponentApplicationService } from '../component'
import type { ITagService } from '../tag'
import type { ITypeService } from '../type'

export interface Filterables {
  [x: string]: Array<string> | boolean | number | string | undefined
}

export type SupportedPaginationModel =
  | AtomFragment
  | IAtomModel
  | IComponentModel
  | ITagModel
  | ITypeModel

export type SupportedPaginationModelPage =
  | PageType.Atoms
  | PageType.Components
  | PageType.Tags
  | PageType.Type

export type SupportedPaginationModelService =
  | IAtomService
  | IComponentApplicationService
  | ITagService
  | ITypeService

export interface IPaginationService<
  T extends SupportedPaginationModel,
  U extends Filterables | undefined,
> {
  currentPage: number
  data: Array<T>
  dataRefs: ObjectMap<Ref<T>>
  filter: U
  isLoading: boolean
  pageSize: number
  totalItems: number

  getData(): Promise<Array<T>>
  getDataFn(
    page: number,
    pageSize: number,
    filter: U,
  ): Promise<{ items: Array<T>; totalItems: number }>
  setCurrentPage(page: number): void
  setFilter(filter: U): void
  setPageSize(size: number): void
}

export interface IPaginateable<
  T extends SupportedPaginationModel,
  U extends Filterables | undefined,
> {
  paginationService: IPaginationService<T, U>
}
