import { ImportStoreCommand } from '@codelab/backend/application/store'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import { PropRepository } from '@codelab/backend/domain/prop'
import type { IElementDTO, IPageExport } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportPageCommand {
  constructor(public page: IPageExport) {}
}

@CommandHandler(ImportPageCommand)
export class ImportPageHandler implements ICommandHandler<ImportPageCommand> {
  constructor(
    private pageRepository: PageRepository,
    private readonly elementRepository: ElementRepository,
    private readonly propRepository: PropRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: ImportPageCommand) {
    const { page } = command

    for (const element of page.elements) {
      await this.propRepository.save(element.props)
      await this.elementRepository.save(element as IElementDTO)
    }

    await this.commandBus.execute<ImportStoreCommand>(
      new ImportStoreCommand(page.store),
    )

    await this.pageRepository.save(page)
  }
}
