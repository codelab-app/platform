import type { StoreWhere } from '@codelab/backend/abstract/codegen'
import { StoreRepository } from '@codelab/backend/domain/store'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'

export class ExportStoreCommand {
  constructor(public where: StoreWhere) {}
}

@CommandHandler(ExportStoreCommand)
export class ExportStoreHandler implements ICommandHandler<ExportStoreCommand> {
  constructor(private storeRepository: StoreRepository) {}

  async execute(command: ExportStoreCommand) {
    const { where } = command
    const store = await this.storeRepository.findOne(where)

    if (!store) {
      throw new Error('Cannot find Component Store')
    }

    return {
      actions: store.actions,
      api: store.api,
      store,
    }
  }
}
