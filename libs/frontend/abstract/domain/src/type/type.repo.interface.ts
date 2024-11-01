import type { IRef, ITypeDto } from '@codelab/shared/abstract/core'
import type {
  BaseTypeFragment,
  GetBaseTypesOptions,
  IBaseTypeOptions,
  IBaseTypeWhere,
  TypeFragment,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'

export interface ITypeRepository
  extends IRepository<
    ITypeDto,
    TypeFragment,
    IBaseTypeWhere,
    IBaseTypeOptions
  > {
  findBaseTypes(options: GetBaseTypesOptions): Promise<{
    items: Array<BaseTypeFragment>
    totalCount: number
  }>
  findDescendants(parentIds: Array<string>): Promise<Array<TypeFragment>>
  findOptions(): Promise<Array<Pick<BaseTypeFragment, 'id' | 'kind' | 'name'>>>
  getAll(ids?: Array<string>): Promise<Array<TypeFragment>>
}
