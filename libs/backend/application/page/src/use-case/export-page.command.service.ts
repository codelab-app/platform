import type {
  IPageAggregateExport,
  IStoreAggregateExport,
} from '@codelab/shared/abstract/core'
import type {
  ElementFragment,
  PageFragment,
  PageWhere,
} from '@codelab/shared/infra/gql'
import type { ICommandHandler } from '@nestjs/cqrs'

import { ExportStoreCommand } from '@codelab/backend/application/store'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import { Validator } from '@codelab/shared/infra/validation'
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

  private async getPageData(page: PageFragment) {
    // TODO: use descendants
    const elementDescendants: Array<ElementFragment> = []
    // page.rootElement.descendants

    const elements = elementDescendants.map((element: ElementFragment) => ({
      ...element,
      closestContainerNode: { id: page.id },
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
