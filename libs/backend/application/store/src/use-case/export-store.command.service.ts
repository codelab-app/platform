import type { StoreWhere } from '@codelab/backend/abstract/codegen'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { StoreRepository } from '@codelab/backend/domain/store'
import type { ApiAction } from '@codelab/shared/abstract/codegen'
import type { IStoreBoundedContext } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportStoreCommand {
  constructor(public where: StoreWhere) {}
}

@CommandHandler(ExportStoreCommand)
export class ExportStoreHandler
  implements ICommandHandler<ExportStoreCommand, IStoreBoundedContext>
{
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportStoreCommand) {
    const store = await this.storeRepository.findOne(where)

    if (!store) {
      throw new Error('Cannot find Component Store')
    }

    const api = await this.commandBus.execute<ExportApiCommand>(
      new ExportApiCommand(store.api),
    )

    // put actions that are referenced from another action via field successAction or errorAction first
    // so that they are imported before the actions that reference them
    store.actions.sort((a) => {
      return a.type === IActionKind.ApiAction &&
        ((a as ApiAction).successAction || (a as ApiAction).errorAction)
        ? 1
        : -1
    })

    return {
      api,
      store,
    }
  }
}
