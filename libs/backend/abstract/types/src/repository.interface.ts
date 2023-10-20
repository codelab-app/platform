import type { IEntity } from '@codelab/shared/abstract/types'
import type { Static, TAnySchema } from '@sinclair/typebox'

export interface IRepository<
  Model extends IEntity,
  ModelData,
  Where extends { id?: string | null },
  Options,
> {
  add(data: Array<Model>): Promise<Array<ModelData>>
  exists(data: Model, where?: Where): Promise<boolean>
  /**
   * Overload with schema for data validation
   */
  find<T extends TAnySchema>(
    args: {
      where?: Where
      options?: Options
    },
    schema?: T,
  ): Promise<Array<ModelData | Static<T>>>
  findOne(where: Where): Promise<ModelData | undefined>
  findOne<T extends TAnySchema>(where: Where, schema: T): Promise<T | undefined>
  save(data: Model, where?: Where): Promise<ModelData | undefined>
  update(data: Model, where: Where): Promise<ModelData | undefined>
}
