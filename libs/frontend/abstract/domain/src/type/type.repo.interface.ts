import type {
  BaseTypeFragment,
  GetBaseTypesOptions,
  IBaseTypeOptions,
  IBaseTypeWhere,
  TypeFragment,
} from '@codelab/frontend/infra/gql'
import type { IRepository } from '../shared'
import type { ITypeModel } from './types'

export type ITypeRepository = IRepository<
  ITypeModel,
  TypeFragment,
  IBaseTypeWhere,
  IBaseTypeOptions
> & {
  getAll(ids?: Array<string>): Promise<Array<TypeFragment>>
  findDescendants(parentIds: Array<string>): Promise<Array<TypeFragment>>
  findBaseTypes(options: GetBaseTypesOptions): Promise<{
    items: Array<BaseTypeFragment>
    totalCount: number
  }>
  findOptions(): Promise<Array<Pick<BaseTypeFragment, 'id' | 'kind' | 'name'>>>
}
