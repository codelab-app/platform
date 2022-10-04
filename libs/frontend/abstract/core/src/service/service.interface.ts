import { IEntity, Maybe } from '@codelab/shared/abstract/types'

export interface ICRUDService<Entity, CreateDTO, UpdateDTO> {
  create(data: Array<CreateDTO>): Promise<Array<Entity>>
  update(existing: IEntity, data: UpdateDTO): Promise<Entity>
  delete(id: string): Promise<Entity>
  deleteMany?(ids: Array<string>): Promise<Array<Entity>>
}

export interface ICacheService<CreateDTO, Entity> {
  writeCache(data: CreateDTO): Entity
}

export interface IQueryService<Entity, EntityWhere> {
  getOne(id: string): Promise<Maybe<Entity>>
  getAll(where?: EntityWhere): Promise<Array<Entity>>
}

export interface ICRUDModalService<
  Metadata = never,
  Properties extends object = never,
> {
  createModal: IEntityModalService
  updateModal: IEntityModalService<Metadata, Properties>
  deleteModal: IEntityModalService<Metadata, Properties>
}

/**
 * Used for base modal, since a class can only implement an object type or intersection of object types with statically known members
 */
export interface IModalService<Metadata = never> {
  isOpen: boolean
  metadata?: Metadata | null
  open(...args: Metadata extends never ? [] : [Metadata]): void
  close(): void
}

export type IEntityModalService<
  Metadata = never,
  Properties extends object = Record<string, unknown>,
> = IModalService<Metadata> & {
  /**
   * All properties must be partial, since we don't know whether user has opened (and set) the metadata yet
   */
  [K in keyof Properties]?: Properties[K]
}
