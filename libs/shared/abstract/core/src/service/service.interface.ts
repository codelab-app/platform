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
