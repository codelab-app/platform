import type { IEntity } from '@codelab/shared/abstract/types'
import type { ArrayOrSingle } from 'ts-essentials'

/**
 * We have a repository for the frontend and the backend. The frontend repository should handle nested creates and updates. Since frontend API calls are more costly, we want to be able to update a graph of data in a single call
 *
 * This is not required for backend as we can more easily call the API without delay. Backend just connects the relationships
 *
 * @template Model is our working model's interface
 * @template ModelFragment is the GraphQL fragment return type, we don't actually use this value though. Since we use optimistic update by modifying mobx model cache before calling the API
 * @template Where where clause, at least need to implement ID
 */
export interface IRepository<
  Model extends IEntity,
  ModelFragment,
  Where extends { id?: string | null },
  Option extends { limit?: number | null; offset?: number | null },
> {
  add(model: Model): Promise<IEntity | undefined>
  addMany?(models: Array<Model>): Promise<Array<IEntity>>
  delete(models: ArrayOrSingle<Model>): Promise<number>
  find(
    where: Where,
    options?: Option,
  ): Promise<{ items: Array<ModelFragment>; aggregate: { count: number } }>
  findOne?(where: Where): Promise<ModelFragment | undefined>
  update(model: Model, where: Where): Promise<IEntity | undefined>
}
