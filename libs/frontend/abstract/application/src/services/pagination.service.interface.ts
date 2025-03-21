import type {
  IAtomModel,
  IComponentModel,
  ITagModel,
  ITypeModel,
} from '@codelab/frontend/abstract/domain'
import type { Model } from '@codelab/frontend/abstract/types'
import type {
  IAtomDto,
  IComponentDto,
  ITagDto,
  ITypeDto,
} from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

import { PageType } from '../shared'

export type SupportedPaginationDto =
  | IAtomDto
  | IComponentDto
  | ITagDto
  | ITypeDto

export type SupportedPaginationModel =
  | IAtomModel
  | IComponentModel
  | ITagModel
  | ITypeModel

// export type SupportedPaginationModelPage =
//   | Model.Atom
//   | Model.Component
//   | Model.Tag
//   | Model.Type

const atoms = PageType.Atoms()
const components = PageType.Components()
const tags = PageType.Tags()
const types = PageType.Type()

export type SupportedPaginationPathname =
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
  isLoadingBetweenPages: boolean
  totalItems: number
  totalPages: number
  setData(data: Array<T>, totalItems: number): void
  setIsLoadingBetweenPages(loading: boolean): void
  setTotalItems(totalPages: number): void
}
