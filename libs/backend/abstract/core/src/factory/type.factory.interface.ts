import type { ITypeDTO } from '@codelab/frontend/abstract/core'
import type {
  BaseTypeUniqueWhereCallback,
  IEntity,
} from '@codelab/shared/abstract/types'
import type { ICreateType, IType, ITypeWhere } from '../type'

/**
 * This uses the factory pattern
 */
export abstract class ITypeFactory<
  Data extends ICreateType,
  Model extends IEntity,
  Where extends ITypeWhere,
> {
  public async create(data: Data, where: Where): Promise<Model> {
    console.log(`${this.constructor.name}`, data, where)

    const type = await this._create(data, where)

    if (!type) {
      throw new Error(`Creation failed for ${data}`)
    }

    return type
  }

  protected abstract _create(
    data: Data,
    where: Where,
  ): Promise<Model | undefined>

  repository: unknown
}
