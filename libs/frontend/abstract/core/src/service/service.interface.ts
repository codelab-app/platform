import type { IEntity, Maybe } from '@codelab/shared/abstract/types'

export interface ICRUDService<
  Entity extends IEntity,
  CreateData,
  UpdateData extends IEntity,
> {
  create(data: CreateData): Promise<Entity>
  /**
   * Array<Entity> makes the function more complicated, we can create a separate deleteMany() for services that require it
   *
   * We only accept id here, since we delete only on id's
   */
  delete(entity: Entity): Promise<Entity>
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

export interface ICRUDModalService<
  Metadata = never,
  Properties extends object = never,
> {
  createModal: IEntityModalService
  deleteModal: IEntityModalService<Metadata, Properties>
  updateModal: IEntityModalService<Metadata, Properties>
}

/**
 * Used for base modal, since a class can only implement an object type or intersection of object types with statically known members
 */
export interface IModalService<Metadata = never> {
  isOpen: boolean
  metadata?: Metadata | null

  close(): void
  open(...args: Metadata extends never ? [] : [Metadata]): void
}

export type IEntityModalService<
  Metadata = never,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Properties extends object = Record<string, any>,
> = IModalService<Metadata> & {
  /**
   * All properties must be partial, since we don't know whether user has opened (and set) the metadata yet
   */
  [K in keyof Properties]?: Properties[K]
}
