import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import type {
  BaseTypeFragment,
  GetBaseTypesOptions,
  IBaseTypeOptions,
  IBaseTypeWhere,
  TypeFragment,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../services'

export type BaseTypesOptions = GetBaseTypesOptions

export type ITypeRepository = IRepository<
  ITypeModel,
  TypeFragment,
  IBaseTypeWhere,
  IBaseTypeOptions
> & {
  findDescendants(parentIds: Array<string>): Promise<Array<TypeFragment>>
  findBaseTypes(options: BaseTypesOptions): Promise<{
    items: Array<BaseTypeFragment>
    totalCount: number
  }>
  findOptions(): Promise<Array<Pick<BaseTypeFragment, 'id' | 'kind' | 'name'>>>
}
