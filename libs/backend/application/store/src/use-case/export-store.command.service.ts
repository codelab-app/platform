import type {
  IApiAggregate,
  IStoreAggregate,
} from '@codelab/shared/abstract/core'
import type { StoreWhere } from '@codelab/shared/infra/gqlgen'
import type { ICommandHandler } from '@nestjs/cqrs'

import { ExportApiCommand } from '@codelab/backend/application/type'
import { StoreRepository } from '@codelab/backend/domain/store'
import {
  IActionKind,
  StoreAggregateSchema,
} from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/typebox'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportStoreCommand {
  constructor(public where: StoreWhere) {}
}

@CommandHandler(ExportStoreCommand)
export class ExportStoreHandler
  implements ICommandHandler<ExportStoreCommand, IStoreAggregate>
{
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportStoreCommand) {
    const store = await this.storeRepository.findOneOrFail({ where })

    const api = await this.commandBus.execute<ExportApiCommand, IApiAggregate>(
      new ExportApiCommand(store.api),
    )

    // put actions that are referenced from another action via field successAction or errorAction first
    // so that they are imported before the actions that reference them
    const actions = store.actions.sort((action1, action2) => {
      if (action1.__typename === IActionKind.ApiAction) {
        return action1.successAction || action1.errorAction ? 1 : -1
      }

      return action1.name.localeCompare(action2.name)
    })

    return Validator.parse(StoreAggregateSchema, {
      actions,
      api,
      store,
    })
  }
}
