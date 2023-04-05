import type { PageType } from '@codelab/frontend/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IAtom, IAtomService, IType, ITypeService } from '../domain'

export interface Filterables {
  [x: string]: Array<string> | boolean | number | string | undefined
}

export type SupportedPaginationModel = IAtom | IType
export type SupportedPaginationModelPage = PageType.Atom | PageType.Type
export type SupportedPaginationModelService = IAtomService | ITypeService

export interface IPaginationService<
  T extends SupportedPaginationModel,
  U extends Filterables | void,
> {
  data: Array<T>
  dataRefs: ObjectMap<Ref<T>>
  filter: U
  isLoading: boolean
  page: number
  pageSize: number
  totalItems: number | undefined

  getData(): Promise<Array<T>>
  getDataFn(
    page: number,
    pageSize: number,
    filter: U,
  ): Promise<{ items: Array<T>; totalItems: number }>
  setFilter(filter: U): void
  setPage(page: number): void
  setPageSize(size: number): void
}
