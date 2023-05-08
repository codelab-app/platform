import type { IEntity } from '@codelab/shared/abstract/types'

export interface IRepository<
  Model extends IEntity,
  ModelData,
  Where extends { id?: string | null },
> {
  add(data: Array<Model>): Promise<Array<ModelData>>
  exists(data: Model, where?: Where): Promise<boolean>
  findOne(where: Where): Promise<ModelData | undefined>
  save(data: Model, where?: Where): Promise<ModelData | undefined>
  update(data: Model, where: Where): Promise<ModelData | undefined>
}
