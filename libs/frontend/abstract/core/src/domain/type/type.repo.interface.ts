import type {
  BaseTypeWhere,
  GetBaseTypesOptions,
  TypeFragment,
} from '@codelab/shared/abstract/codegen'
import type { IEntity } from '@codelab/shared/abstract/types'
import type { IRepository } from '../../service'
import type { BaseType_BaseType_Fragment } from './fragments/base-type.fragment.graphql.gen'
import type { IType } from './types'

export type BaseTypesOptions = GetBaseTypesOptions

export type ITypeRepository = IRepository<IType, IEntity, BaseTypeWhere> & {
  findDescendants(parentIds: Array<string>): Promise<Array<TypeFragment>>
  findBaseTypes(options: BaseTypesOptions): Promise<{
    items: Array<BaseType_BaseType_Fragment>
    totalCount: number
  }>
}
