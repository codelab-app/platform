import type { BaseUniqueWhere, IEntity } from '@codelab/shared/abstract/types'

export interface IRepository<Model extends IEntity> {
  find(where: BaseUniqueWhere): Promise<Model | undefined>
  add(data: Array<Model>): Promise<Array<Model>>
  update(
    data: Omit<Model, 'id'>,
    where: BaseUniqueWhere,
  ): Promise<Model | undefined>
  save(data: Model, where?: BaseUniqueWhere): Promise<Model | undefined>
  exists(data: Model, where?: BaseUniqueWhere): Promise<boolean>
  //
  delete(ids: Array<string>): Promise<number>
}
