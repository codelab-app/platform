import { Maybe } from '@codelab/shared/abstract/types'

export interface ICRUDService<Entity, CreateDTO, UpdateDTO> {
  create(data: CreateDTO, ownerId: string): Promise<Entity>
  update(existing: Entity, data: UpdateDTO): Promise<Entity>
  delete(id: string): Promise<Entity>
}

export interface IQueryService<Entity, EntityWhere> {
  getOne(id: string): Promise<Maybe<Entity>>
  getAll(where?: EntityWhere): Promise<Array<Entity>>
}

export interface ICRUDModalService<Entity> {
  createModal: IModalService<Entity>
  updateModal: IModalService<Entity>
  deleteModal: IModalService<Entity>
}

export type IModalService<Entity = never, Fields = unknown> = {
  isOpen: boolean
  metadata: any
  open(...args: Entity extends never ? [] : [Entity]): void
  close(): void
} & { [K in keyof Fields]: Fields[K] }
