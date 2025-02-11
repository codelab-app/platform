import type { IPageAggregateImport } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { ImportStoreCommand } from '@codelab/backend/application/store'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportPageCommand {
  constructor(public pageImport: IPageAggregateImport) {}
}

@CommandHandler(ImportPageCommand)
export class ImportPageHandler implements ICommandHandler<ImportPageCommand> {
  constructor(
    private pageRepository: PageRepository,
    private readonly elementRepository: ElementRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: ImportPageCommand) {
    const { elements, page, store } = command.pageImport

    await this.commandBus.execute<ImportStoreCommand>(
      new ImportStoreCommand(store),
    )

    for (const element of elements) {
      await this.elementRepository.save(element)
    }

    await this.pageRepository.save(page)
  }
}
