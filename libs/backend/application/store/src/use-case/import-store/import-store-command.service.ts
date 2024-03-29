import { ImportApiCommand } from '@codelab/backend/application/type'
import { ActionFactory } from '@codelab/backend/domain/action'
import { StoreRepository } from '@codelab/backend/domain/store'
import type { IStoreAggregate } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportStoreCommand {
  constructor(public storeAggregate: IStoreAggregate) {}
}

@CommandHandler(ImportStoreCommand)
export class ImportStoreHandler implements ICommandHandler<ImportStoreCommand> {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly commandBus: CommandBus,
    private readonly actionFactory: ActionFactory,
  ) {}

  async execute(command: ImportStoreCommand) {
    const { api, store } = command.storeAggregate

    await this.commandBus.execute<ImportApiCommand>(new ImportApiCommand(api))

    await this.storeRepository.save(store)

    for (const action of store.actions) {
      await this.actionFactory.save(action)
    }
  }
}
