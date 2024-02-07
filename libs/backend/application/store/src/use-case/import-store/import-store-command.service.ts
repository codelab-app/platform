import { ImportApiCommand } from '@codelab/backend/application/type'
import { ActionService } from '@codelab/backend/domain/action'
import { StoreRepository } from '@codelab/backend/domain/store'
import type { IStoreExport } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportStoreCommand {
  constructor(public store: IStoreExport) {}
}

@CommandHandler(ImportStoreCommand)
export class ImportStoreHandler implements ICommandHandler<ImportStoreCommand> {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly commandBus: CommandBus,
    private readonly actionFactory: ActionService,
  ) {}

  async execute(command: ImportStoreCommand) {
    const { actions, resources, ...store } = command.store

    await this.commandBus.execute<ImportApiCommand>(
      new ImportApiCommand(store.api),
    )

    await this.storeRepository.save(store)

    for (const action of actions) {
      await this.actionFactory.save(action)
    }
  }
}
