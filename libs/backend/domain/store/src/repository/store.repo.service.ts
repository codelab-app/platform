import type {
  Store,
  StoreModel,
  StoreOptions,
  StoreWhere,
} from '@codelab/backend/abstract/codegen'
import {
  OGMService,
  storeSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IStoreDTO } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StoreRepository extends AbstractRepository<
  IStoreDTO,
  Store,
  StoreWhere,
  StoreOptions
> {
  private Store!: StoreModel

  constructor(
    private ogmService: OGMService,
    protected override traceService: TraceService,
  ) {
    super(traceService)
  }

  async _find({
    options,
    where,
  }: {
    where?: StoreWhere
    options?: StoreOptions
  }) {
    return await (
      await this.ogmService.Store
    ).find({
      options,
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
        await this.ogmService.Store
      ).create({
        input: stores.map(({ api, id, name }) => ({
          api: connectNodeId(api.id),
          id,
          name,
        })),
      })
    ).stores
  }

  protected async _update({ api, id, name }: IStoreDTO, where: StoreWhere) {
    return (
      await (
        await this.ogmService.Store
      ).update({
        update: {
          name,
        },
        where,
      })
    ).stores[0]
  }
}
