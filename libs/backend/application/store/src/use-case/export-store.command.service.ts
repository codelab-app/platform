import type { StoreWhere } from '@codelab/backend/abstract/codegen'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { StoreRepository } from '@codelab/backend/domain/store'
import { CommandBus, ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportStoreCommand {
  constructor(public where: StoreWhere) {}
}

@CommandHandler(ExportStoreCommand)
export class ExportStoreHandler implements ICommandHandler<ExportStoreCommand> {
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

    return {
      actions: store.actions,
      api,
      store,
    }
  }
}
