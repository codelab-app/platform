import type { BaseTypeUniqueWhereCallback } from '@codelab/shared/abstract/types'
import type { ICreateType, IType } from '../type'

/**
 * This uses the factory pattern
 */
export abstract class ITypeFactory<
  Data extends ICreateType,
  Model extends IType,
> {
  public async create(
    data: Data,
    /**
     * We pass the complete type in the callback
     */
    where: BaseTypeUniqueWhereCallback<IType>,
  ): Promise<Model> {
    console.log(`${this.constructor.name}`, data, where)

    const type = await this._create(data, where)

    if (!type) {
      throw new Error(`Creation failed for ${data}`)
    }

    return type
  }

  protected abstract _create(
    data: Data,
    where: BaseTypeUniqueWhereCallback<IType>,
  ): Promise<Model | undefined>

  repository: unknown
}
