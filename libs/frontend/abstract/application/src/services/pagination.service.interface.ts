import type {
  IAtomModel,
  IComponentModel,
  ITagModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import type { PageType } from '@codelab/frontend/abstract/types'
import type { Ref } from 'mobx-keystone'
import type { IAtomService } from '../atom'
import type { IComponentService } from '../component'
import type { ITagService } from '../tag'
import type { ITypeService } from '../type'

export interface Filterables {
  [x: string]: Array<string> | boolean | number | string | undefined
}

export type SupportedPaginationModel =
  | IAtomModel
  | IComponentModel
  | ITagModel
  | ITypeModel

export type SupportedPaginationModelPage =
  | ReturnType<typeof PageType.Atoms>
  | ReturnType<typeof PageType.Components>
  | ReturnType<typeof PageType.Tags>
  | ReturnType<typeof PageType.Type>
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

export interface IPaginationService<
  T extends SupportedPaginationModel,
  U extends Filterables,
> {
  currentPage: number
  data: Array<T>
  dataRefs: Map<string, Ref<T>>
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
  setFilter(filter: Partial<U>): void
  setPageSize(size: number): void
}
