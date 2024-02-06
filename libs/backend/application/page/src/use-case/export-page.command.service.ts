import type { AppWhere, Page } from '@codelab/backend/abstract/codegen'
import { ExportStoreCommand } from '@codelab/backend/application/store'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import type { IElement, IPage } from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { throwIfUndefined, uuidRegex } from '@codelab/shared/utils'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import flatMap from 'lodash/flatMap'

export class ExportPageCommand {
  constructor(public where: AppWhere) {}
}

@CommandHandler(ExportPageCommand)
export class ExportPageHandler
  implements ICommandHandler<ExportPageCommand, Array<IPage>>
{
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly elementRepository: ElementRepository,
    private readonly componentRepository: ComponentRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportPageCommand) {
    const pages = await this.pageRepository.find({
      where: { app: { id: where.id } },
    })

    const pagesExport: Array<IPage> = await Promise.all(
      pages.map(async (page) => {
        const { components, elements, store } = await this.getPageData(page)

        return {
          ...page,
          elements,
          slug: page.slug,
          store,
        }
      }),
    )

    return pagesExport
  }

  private async getPageData(page: Page) {
    const elements: Array<IElement> = (
      await this.elementRepository.getElementWithDescendants(
        page.rootElement.id,
      )
    ).map((element) => ({
      ...element,
      closestContainerNode: { id: page.id },
      renderType: {
        __typename: throwIfUndefined(element.renderType.__typename),
        id: element.renderType.id,
      },
    }))

    const componentIds = flatMap(elements, (element) => [
      element.parentComponent?.id,
      element.renderType.__typename === IElementRenderTypeKind.Component
        ? element.renderType.id
        : null,
      element.childMapperComponent?.id,
      ...((element.props.data as string).match(uuidRegex) || []),
    ]).filter((element): element is string => Boolean(element))

    const components = await this.componentRepository.find({
      where: { id_IN: componentIds },
    })

    for (const { id, rootElement } of components) {
      const componentDescendants = (
        await this.elementRepository.getElementWithDescendants(rootElement.id)
      ).map((element) => ({
        ...element,
        closestContainerNode: { id },
        renderType: {
          __typename: throwIfUndefined(element.renderType.__typename),
          id: element.renderType.id,
        },
      }))

      elements.push(...componentDescendants)
    }

    const store = await this.commandBus.execute<ExportStoreCommand>(
      new ExportStoreCommand({ id: page.store.id }),
    )

    return { components, elements, store }
  }
}
