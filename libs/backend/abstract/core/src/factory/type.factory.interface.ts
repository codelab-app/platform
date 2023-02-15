import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import type { IBaseType, ICreateType, IType } from '../type'

/**
 * This uses the factory pattern
 */
export interface ITypeFactory<Data extends ICreateType> {
  create(
    data: Data,
    /**
     * We pass the complete type in the callback
     */
    where: BaseTypeUniqueWhereCallback<IType>,
  ): Promise<IBaseType>

  repository: unknown
}
