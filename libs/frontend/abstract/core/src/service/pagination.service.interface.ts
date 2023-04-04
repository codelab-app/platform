import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IAtom, IType } from '../domain'

export interface Filterables {
  [x: string]: unknown
}

export type SupportedModel = IAtom | IType

export interface IPaginationService<
  T extends SupportedModel,
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
