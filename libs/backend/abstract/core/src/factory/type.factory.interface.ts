import type { IRepository } from '@codelab/backend/abstract/types'
import type {
  BaseUniqueWhere,
  BaseUniqueWhereCallback,
} from '@codelab/shared/abstract/types'
import type { IBaseType } from '../type'

/**
 * This uses the factory pattern
 */
export interface ITypeFactory<T> {
  create(data: T, where?: BaseUniqueWhere): Promise<IBaseType>

  repository: unknown
}
