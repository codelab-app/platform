import type {
  Element,
  Page,
  PageWhere,
} from '@codelab/backend/abstract/codegen'
import type {
  IPageAggregateExport,
  IStoreAggregateExport,
} from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'

import { ExportStoreCommand } from '@codelab/backend/application/store'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import { Validator } from '@codelab/shared/infra/schema'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportPageCommand {
  constructor(public where: PageWhere) {}
}

@CommandHandler(ExportPageCommand)
export class ExportPageHandler
  implements ICommandHandler<ExportPageCommand, Array<IPageAggregateExport>>
{
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly elementRepository: ElementRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportPageCommand) {
    const pages = await this.pageRepository.find({ where })

    const pagesExport: Array<IPageAggregateExport> = await Promise.all(
      pages.map(async (page) => {
        const { elements, store } = await this.getPageData(page)

        return {
          elements,
          page,
          store,
        }
      }),
    )

    return pagesExport
  }

  private async getPageData(page: Page) {
    const elements = (
      await this.elementRepository.getElementWithDescendants(
        page.rootElement.id,
      )
    ).map((element: Element) => ({
      ...element,
      renderType: {
        __typename: Validator.parseDefined(element.renderType.__typename),
        id: element.renderType.id,
      },
    }))

    const store = await this.commandBus.execute<
      ExportStoreCommand,
      IStoreAggregateExport
    >(new ExportStoreCommand({ id: page.store.id }))

    return { elements, store }
  }
}
