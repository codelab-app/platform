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
   *
   * Renamed from `delete` to `remove` since a function name cannot be `delete`
   */
  // remove(item: Entity): Promise<number>
  removeMany(items: Array<Entity>): Promise<number>
  update(data: UpdateData): Promise<Entity>
}

export interface IQueryService<Entity, EntityWhere, EntityOptions> {
  /**
   * @deprecated Fetch from server side and hydrate separately
   */
  getAll(where?: EntityWhere, options?: EntityOptions): Promise<Array<Entity>>
  getAllFromCache(where?: EntityWhere): Array<Entity>
  /**
   * @deprecated Fetch from server side and hydrate separately
   */
  getOne(id: string): Promise<Maybe<Entity>>
  getOneFromCache(ref: IRef): Entity
}
