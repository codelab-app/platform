import type { IPageOutputDto } from '@codelab/backend/abstract/core'
import { ImportStoreCommand } from '@codelab/backend/application/store'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import { FieldRepository } from '@codelab/backend/domain/type'
import type { IAuth0User } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ImportPageCommand {
  constructor(public pageExport: IPageOutputDto, public owner: IAuth0User) {}
}

@CommandHandler(ImportPageCommand)
export class ImportPageHandler implements ICommandHandler<ImportPageCommand> {
  constructor(
    private pageRepository: PageRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly elementRepository: ElementRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: ImportPageCommand) {
    const {
      owner,
      pageExport: { elements, page, store },
    } = command

    for (const element of elements) {
      await this.elementRepository.save(element)
    }

    for (const field of store.api.fields) {
      await this.fieldRepository.save(field)
    }

    await this.commandBus.execute<ImportStoreCommand>(
      new ImportStoreCommand(store, owner),
    )

    await this.pageRepository.save(page)
  }
}
