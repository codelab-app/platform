import type {
  IAtomModel,
  IComponentModel,
  ITagModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import type { Ref } from 'mobx-keystone'

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

export interface IPaginateable<T extends SupportedPaginationModel> {
  getDataFn: GetDataFn<T>
  paginationService: IPaginationService<T>
}

export type GetDataFn<T extends SupportedPaginationModel> = (
  page: number,
  pageSize: number,
  filter: Array<string>,
  search?: string,
) => Promise<{ items: Array<T>; totalItems: number }>

export interface IPaginationService<T extends SupportedPaginationModel> {
  data: Array<T>
  dataRefs: Map<string, Ref<T>>
  isLoading: boolean
  totalItems: number
  totalPages: number
  getData(): Promise<Array<T>>
  setTotalItems(totalPages: number): void
}
