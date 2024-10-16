import type {
  Store,
  StoreOptions,
  StoreWhere,
} from '@codelab/backend/abstract/codegen'
import type { IStoreDto } from '@codelab/shared/abstract/core'

import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  OgmService,
  storeSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { connectNodeId } from '@codelab/shared/domain-old'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StoreRepository extends AbstractRepository<
  IStoreDto,
  Store,
  StoreWhere,
  StoreOptions
> {
  constructor(
    private ogmService: OgmService,

    protected override validationService: ValidationService,
    protected loggerService: CodelabLoggerService,
  ) {
    super(validationService, loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(stores: Array<IStoreDto>) {
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

  protected async _find({
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
      selectionSet: `{ ${storeSelectionSet} }`,
      where,
    })
  }

  protected async _update({ api, id, name }: IStoreDto, where: StoreWhere) {
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
