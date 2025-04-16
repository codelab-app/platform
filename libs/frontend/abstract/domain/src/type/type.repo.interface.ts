import type { ITypeDto } from '@codelab/shared-abstract-core'
import type { NextFetchOptions } from '@codelab/shared-abstract-types'
import type {
  BaseTypeFragment,
  IBaseTypeOptions,
  IBaseTypeWhere,
  TypeFragment,
} from '@codelab/shared-infra-gqlgen'

import type { IRepository } from '../shared'

export interface ITypeRepository
  extends IRepository<
    ITypeDto,
    TypeFragment,
    IBaseTypeWhere,
    IBaseTypeOptions
  > {
  findBaseTypes(
    params?: {
      where: IBaseTypeWhere
      options: IBaseTypeOptions
    },
    next?: NextFetchOptions,
  ): Promise<{
    items: Array<BaseTypeFragment>
    totalCount: number
  }>
  findDescendants(
    parentIds: Array<string>,
    next?: NextFetchOptions,
  ): Promise<Array<TypeFragment>>
  getAll(
    ids?: Array<string>,
    next?: NextFetchOptions,
  ): Promise<Array<TypeFragment>>
}
