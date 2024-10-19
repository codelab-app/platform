import type {
  BaseTypeFragment,
  GetBaseTypesOptions,
  IBaseTypeOptions,
  IBaseTypeWhere,
  TypeFragment,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type {
  ITypeCreateInput,
  ITypeDeleteInput,
  ITypeUpdateInput,
} from './type.input.interface'
import type { ITypeModel } from './types'

export interface ITypeRepository
  extends IRepository<
    ITypeCreateInput,
    ITypeUpdateInput,
    ITypeDeleteInput,
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
