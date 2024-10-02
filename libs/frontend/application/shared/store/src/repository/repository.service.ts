import type { IRepository } from '@codelab/frontend/abstract/application'
import type { IRef } from '@codelab/shared/abstract/core'

import { Model, model } from 'mobx-keystone'

/**
 * Mobx keystone cannot have abstract methods, so we implement an empty method that throws if not overridden
 */
@model('@codelab/RepositoryService')
export class RepositoryService<
    IModel extends IRef,
    ModelFragment,
    Where extends { id?: number | string | null },
    Option extends { limit?: number | null; offset?: number | null },
  >
  extends Model({})
  implements IRepository<IModel, ModelFragment, Where, Option>
{
  add(item: IModel): Promise<IRef | undefined> {
    throw new Error('Must implement `add` method')
  }

  delete(models: Array<IModel>): Promise<number> {
    throw new Error('Must implement `delete` method')
  }

  find(
    where?: Where,
    options?: Option,
  ): Promise<{ items: Array<ModelFragment>; aggregate: { count: number } }> {
    throw new Error('Must implement `find` method')
  }

  async findOne(where: Where): Promise<ModelFragment | undefined> {
    return (await this.find(where)).items[0]
  }

  update(item: IModel, where: Where): Promise<IRef | undefined> {
    throw new Error('Must implement `update` method')
  }
}
