import type { IStoreOutputDto } from '@codelab/backend/abstract/core'
import { ImportApiCommand } from '@codelab/backend/application/type'
import { ActionFactory } from '@codelab/backend/domain/action'
import { StoreRepository } from '@codelab/backend/domain/store'
import { FieldRepository } from '@codelab/backend/domain/type'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportStoreCommand {
  constructor(public storeExport: IStoreOutputDto) {}
}

@CommandHandler(ImportStoreCommand)
export class ImportStoreHandler implements ICommandHandler<ImportStoreCommand> {
  constructor(
    private readonly storeRepository: StoreRepository,
    private readonly commandBus: CommandBus,
    private readonly actionFactory: ActionFactory,
    private readonly fieldRepository: FieldRepository,
  ) {}

  async execute(command: ImportStoreCommand) {
    const {
      storeExport: { actions, api, store },
    } = command

    await this.storeRepository.save(store)

    for (const action of actions) {
      await this.actionFactory.save(action)
    }

    await this.commandBus.execute<ImportApiCommand>(new ImportApiCommand(api))
  }
}
