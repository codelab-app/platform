import type {
  ElementFragment,
  PageFragment,
  PageWhere,
} from '@codelab/shared-infra-gqlgen'
import type { ICommandHandler } from '@nestjs/cqrs'

import { ExportStoreCommand } from '@codelab/backend-application-store'
import {
  PageElementsService,
  PageRepository,
} from '@codelab/backend-domain-page'
import {
  ElementExportSchema,
  type IPageAggregate,
  type IStoreAggregate,
} from '@codelab/shared-abstract-core'
import { Validator } from '@codelab/shared-infra-typebox'
import {
  sortElementsForExport,
  sortPagesByKindAndName,
} from '@codelab/shared-utils'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportPageCommand {
  constructor(public where: PageWhere) {}
}

@CommandHandler(ExportPageCommand)
export class ExportPageHandler
  implements ICommandHandler<ExportPageCommand, Array<IPageAggregate>>
{
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly pageElementsService: PageElementsService,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportPageCommand) {
    const pages = await this.pageRepository.find({ where })

    sortPagesByKindAndName(pages)

    const pagesExport: Array<IPageAggregate> = await Promise.all(
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
    const elementDescendants = await this.pageElementsService.getElements(page)
    const sortedElements = sortElementsForExport(elementDescendants)

    const elements = sortedElements.map((element: ElementFragment) =>
      Validator.parse(ElementExportSchema, {
        ...element,
        closestContainerNode: { id: page.id },
        renderType: {
          __typename: Validator.parseDefined(element.renderType.__typename),
          id: element.renderType.id,
        },
      }),
    )

    const store = await this.commandBus.execute<
      ExportStoreCommand,
      IStoreAggregate
    >(new ExportStoreCommand({ id: page.store.id }))

    return { elements, store }
  }
}
