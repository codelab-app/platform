import type { IRef } from '@codelab/shared/abstract/core'
import type { Static, TAnySchema } from '@sinclair/typebox'

export interface IRepository<
  Model extends IRef,
  ModelData,
  Where extends { id?: string | null },
  Options,
> {
  add(data: Model): Promise<ModelData>
  addMany(data: Array<Model>): Promise<Array<ModelData>>
  exists(data: Model, where?: Where): Promise<boolean>
  find(args?: { where?: Where; options?: Options }): Promise<Array<ModelData>>
  /**
   * We enforce schema validation if selectionSet is enabled
   */
  find<T extends TAnySchema>(args?: {
    where?: Where
    options?: Options
    schema: T
    selectionSet?: string
  }): Promise<Array<Static<T>>>

  /**
   * Finds one without schema validation
   */
  findOne(args?: {
    where: Where
    options?: Options
  }): Promise<ModelData | undefined>
  /**
   * Finds one with schema validation
   */
  findOne<T extends TAnySchema>(args: {
    where: Where
    options?: Options
    selectionSet?: string
    schema: T
  }): Promise<Static<T> | undefined>
  save(data: Model, where?: Where): Promise<ModelData | undefined>
  update(data: Model, where: Where): Promise<IRef | undefined>
}
