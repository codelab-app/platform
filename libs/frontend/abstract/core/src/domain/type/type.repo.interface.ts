import type {
  BaseTypeWhere,
  TypeFragment,
} from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { BaseType_BaseType_Fragment } from './fragments/base-type.fragment.graphql.gen'
import type { ITypeDTO } from './type.dto.interface'
import type { IType } from './types'

export interface BaseTypesOptions {
  limit?: number
  offset?: number
  where?: {
    name: string
  }
}

export type ITypeRepository = IRepository<IType, ITypeDTO, BaseTypeWhere> & {
  findDescendants(parentIds: Array<string>): Promise<Array<TypeFragment>>
  findBaseTypes(options: BaseTypesOptions): Promise<{
    items: Array<BaseType_BaseType_Fragment>
    totalCount: number
  }>
}
