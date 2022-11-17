import { IEntity, Maybe } from '@codelab/shared/abstract/types'

export interface ICRUDService<Entity, CreateDTO, UpdateDTO> {
  create(data: Array<CreateDTO>): Promise<Array<Entity>>
  update(existing: IEntity, data: UpdateDTO): Promise<Array<Entity>>
  delete(ids: Array<string>): Promise<number>
}

export interface ICacheService<CreateDTO, Entity> {
  writeCache(data: CreateDTO): Entity
}

export interface IQueryService<Entity, EntityWhere, EntityOptions> {
  getOne(id: string): Promise<Maybe<Entity>>
  getAll(where?: EntityWhere, options?: EntityOptions): Promise<Array<Entity>>
}

export interface IPaginationService<Entity> {
  entityIdsOfcurrentLoadedPage: Array<string>
  entitiesOfCurrentPage: Array<Entity>
  totalEntitiesCount: number
  pageSize: number
  currentLoadedPage: number

  getByPage(page: number, pageSize: number): Promise<void>
  refetchCurrentPage(): Promise<void>
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Properties extends object = Record<string, any>,
> = IModalService<Metadata> & {
  /**
   * All properties must be partial, since we don't know whether user has opened (and set) the metadata yet
   */
  [K in keyof Properties]?: Properties[K]
}
