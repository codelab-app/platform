import type { IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

export interface ICRUDService<
  Entity extends IRef,
  CreateData,
  UpdateData extends IRef,
> {
  create(data: CreateData): Promise<Entity>
  /**
   * Delete many is used many places, so default to plural form. Also return type is rarely used
   */
  delete(items: Array<Entity>): Promise<void>
  update(data: UpdateData): Promise<Entity>
}

export interface IQueryService<Entity, EntityWhere, EntityOptions> {
  getAll(where?: EntityWhere, options?: EntityOptions): Promise<Array<Entity>>
  getOne(id: string): Promise<Maybe<Entity>>
}
