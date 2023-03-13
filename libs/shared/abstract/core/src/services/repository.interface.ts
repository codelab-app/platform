import type { BaseUniqueWhere, IEntity } from '@codelab/shared/abstract/types'

export interface IRepository<Model extends IEntity> {
  add(data: Array<Model>): Promise<Array<Model>>
  //
  delete(ids: Array<string>): Promise<number>
  exists(data: Model, where?: BaseUniqueWhere): Promise<boolean>
  find(where: BaseUniqueWhere): Promise<Model | undefined>
  save(data: Model, where?: BaseUniqueWhere): Promise<Model | undefined>
  update(
    data: Omit<Model, 'id'>,
    where: BaseUniqueWhere,
  ): Promise<Model | undefined>
}
