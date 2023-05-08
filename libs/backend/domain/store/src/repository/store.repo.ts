import {
  Repository,
  storeSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'

export class StoreRepository extends AbstractRepository<
  IStoreDTO,
  OGM_TYPES.Store,
  OGM_TYPES.StoreWhere
> {
  private Store = Repository.instance.Store

  async _find(where: OGM_TYPES.StoreWhere = {}) {
    return await (
      await this.Store
    ).find({
      selectionSet: storeSelectionSet,
      where,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(stores: Array<IStoreDTO>) {
    return (
      await (
        await this.Store
      ).create({
        input: stores.map(({ api, id, name }) => ({
          api: connectNodeId(api.id),
          id,
          name,
        })),
      })
    ).stores
  }

  protected async _update(
    { api, id, name }: IStoreDTO,
    where: OGM_TYPES.StoreWhere,
  ) {
    return (
      await (
        await this.Store
      ).update({
        update: {
          name,
        },
        where,
      })
    ).stores[0]
  }
}
