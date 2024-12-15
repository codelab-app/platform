import type {
  IApiExport,
  IStoreAggregateExport,
} from '@codelab/shared/abstract/core'
import type { StoreWhere } from '@codelab/shared/infra/gql'
import type { ICommandHandler } from '@nestjs/cqrs'

import { ExportApiCommand } from '@codelab/backend/application/type'
import { StoreRepository } from '@codelab/backend/domain/store'
import { IActionKind } from '@codelab/shared/abstract/core'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportStoreCommand {
  constructor(public where: StoreWhere) {}
}

@CommandHandler(ExportStoreCommand)
export class ExportStoreHandler
  implements ICommandHandler<ExportStoreCommand, IStoreAggregateExport>
{
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportStoreCommand) {
    const store = await this.storeRepository.findOneOrFail({ where })

    const api = await this.commandBus.execute<ExportApiCommand, IApiExport>(
      new ExportApiCommand(store.api),
    )

    // put actions that are referenced from another action via field successAction or errorAction first
    // so that they are imported before the actions that reference them
    const actions = store.actions.sort((action) => {
      if (action.__typename === IActionKind.ApiAction) {
        return action.successAction || action.errorAction ? 1 : -1
      }

      return -1
    })

    return {
      actions,
      api,
      store,
    }
  }
}
