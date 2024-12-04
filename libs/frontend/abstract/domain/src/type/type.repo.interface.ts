import type { IRef, ITypeDto } from '@codelab/shared/abstract/core'
import type {
  BaseTypeFragment,
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
  findBaseTypes(params?: {
    where: IBaseTypeWhere
    options: IBaseTypeOptions
  }): Promise<{
    items: Array<BaseTypeFragment>
    totalCount: number
  }>
  findDescendants(parentIds: Array<string>): Promise<Array<TypeFragment>>
  getAll(ids?: Array<string>): Promise<Array<TypeFragment>>
}
