import type { IRef } from '@codelab/shared/abstract/core'
import type { NextFetchOptions } from '@codelab/shared/abstract/types'

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
  Dto,
  ModelFragment,
  Where extends { id?: number | string | null },
  Option extends { limit?: number | null; offset?: number | null },
> {
  add(dto: Dto, options?: NextFetchOptions): Promise<IRef>
  delete(where: Array<IRef>, next?: NextFetchOptions): Promise<number>
  find(
    where?: Where,
    options?: Option,
    next?: NextFetchOptions,
  ): Promise<IFindResults<ModelFragment>>
  findOne(
    where: Where,
    next?: NextFetchOptions,
  ): Promise<ModelFragment | undefined>
  /**
   * Considered using only dto, but for backend sometimes we upsert by name
   */
  update(
    where: IRef,
    dto: Partial<Dto>,
    options?: NextFetchOptions,
  ): Promise<IRef>
}

export interface IFindResults<ModelFragment> {
  aggregate: { count: number }
  items: Array<ModelFragment>
}
