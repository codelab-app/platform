import type { IEntity, Maybe } from '@codelab/shared/abstract/types'

export interface ICRUDService<
  Entity extends IEntity,
  CreateData,
  UpdateData extends IEntity,
> {
  create(data: CreateData): Promise<Entity>
  /**
   * Delete many is used many places, so default to plural form. Also return type is rarely used
   */
  delete(items: Array<Entity>): Promise<void>
  update(data: UpdateData): Promise<Entity>
}

export interface ICacheService<CreateDTO, Entity> {
  /**
   * Allows an existing model to update its cache
   */
  writeCache(data: Partial<CreateDTO>): Entity
}

export interface IQueryService<Entity, EntityWhere, EntityOptions> {
  getAll(where?: EntityWhere, options?: EntityOptions): Promise<Array<Entity>>
  getOne(id: string): Promise<Maybe<Entity>>
}
