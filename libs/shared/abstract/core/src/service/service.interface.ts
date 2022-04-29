import { Maybe } from '@codelab/shared/abstract/types'

export interface ICRUDService<Entity, CreateDTO, UpdateDTO> {
  create(data: Array<CreateDTO>): Promise<Array<Entity>>
  update(existing: Entity, data: UpdateDTO): Promise<Entity>
  delete(id: string): Promise<Entity>
  deleteMany?(ids: Array<string>): Promise<Array<Entity>>
}

export interface IQueryService<Entity, EntityWhere> {
  getOne(id: string): Promise<Maybe<Entity>>
  getAll(where?: EntityWhere): Promise<Array<Entity>>
}

export interface ICRUDModalService<
  Metadata = never,
  Properties extends object = never,
> {
  createModal: IModalService
  updateModal: IModalService<Metadata, Properties>
  deleteModal: IModalService<Metadata, Properties>
  // Move to model service so we can make it required
  // deleteManyModal?: IModalService<Array<Entity>, `${Key}s`>
}

/**
 * Used for base modal, since a class can only implement an object type or intersection of object types with statically known members
 */
export interface IBaseModalService<
  Metadata = never,
  Properties extends object = never,
> {
  isOpen: boolean
  metadata: Metadata | null
  open(...args: Metadata extends never ? [] : [Metadata]): void
  close(): void
}

export type IModalService<
  Metadata = never,
  Properties extends object = Record<string, any>,
> = IBaseModalService<Metadata, Properties> & {
  [K in keyof Properties]: Properties[K]
}
