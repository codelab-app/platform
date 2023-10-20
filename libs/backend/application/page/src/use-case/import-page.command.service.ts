import { ImportStoreCommand } from '@codelab/backend/application/store'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import type { IPageBoundedContext } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportPageCommand {
  constructor(public page: IPageBoundedContext) {}
}

@CommandHandler(ImportPageCommand)
export class ImportPageHandler implements ICommandHandler<ImportPageCommand> {
  constructor(
    private pageRepository: PageRepository,
    private readonly elementRepository: ElementRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: ImportPageCommand) {
    const {
      page: { elements, page, store },
    } = command

    for (const element of elements) {
      await this.elementRepository.save(element)
    }

    await this.commandBus.execute<ImportStoreCommand>(
      new ImportStoreCommand(store),
    )

    await this.pageRepository.save(page)
  }
}
