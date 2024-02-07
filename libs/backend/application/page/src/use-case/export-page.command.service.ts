import type { Page, PageWhere } from '@codelab/backend/abstract/codegen'
import { ExportStoreCommand } from '@codelab/backend/application/store'
import { ExportApiCommand } from '@codelab/backend/application/type'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import type {
  IComponentExport,
  IElement,
  IPageExport,
  IStoreExport,
} from '@codelab/shared/abstract/core'
import { IElementRenderTypeKind } from '@codelab/shared/abstract/core'
import { throwIfUndefined, uuidRegex } from '@codelab/shared/utils'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import flatMap from 'lodash/flatMap'
import uniq from 'lodash/uniq'

export class ExportPageCommand {
  constructor(public where: PageWhere) {}
}

@CommandHandler(ExportPageCommand)
export class ExportPageHandler
  implements ICommandHandler<ExportPageCommand, Array<IPageExport>>
{
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly elementRepository: ElementRepository,
    private readonly componentRepository: ComponentRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportPageCommand) {
    const pages = await this.pageRepository.find({ where })

    const pagesExport: Array<IPageExport> = await Promise.all(
      pages.map(async (page) => {
        const { components, elements, store } = await this.getPageData(page)

        return {
          ...page,
          components,
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

    let elementsCurrentBatch = elements
    const components: Array<IComponentExport> = []
    let currentRun = 0
    const maxRuns = 10

    do {
      const componentIds = uniq(
        flatMap(elementsCurrentBatch, (element) => [
          element.parentComponent?.id,
          element.renderType.__typename === IElementRenderTypeKind.Component
            ? element.renderType.id
            : null,
          element.childMapperComponent?.id,
          ...((element.props.data as string).match(uuidRegex) || []),
        ]).filter(
          (id): id is string =>
            Boolean(id) && !components.some((comp) => comp.id === id),
        ),
      )

      const currentComponents = await this.componentRepository.find({
        where: { id_IN: componentIds },
      })

      const currentElements: Array<IElement> = []

      for (const currentComponent of currentComponents) {
        const componentDescendants =
          await this.elementRepository.getElementWithDescendants(
            currentComponent.rootElement.id,
          )

        const componentDescendants2 = componentDescendants.map((element) => ({
          ...element,
          closestContainerNode: { id: currentComponent.id },
          renderType: {
            __typename: throwIfUndefined(element.renderType.__typename),
            id: element.renderType.id,
          },
        }))

        const componentStore = await this.commandBus.execute<
          ExportStoreCommand,
          IStoreExport
        >(new ExportStoreCommand({ id: currentComponent.store.id }))

        const componentApi = await this.commandBus.execute<ExportApiCommand>(
          new ExportApiCommand(currentComponent.api),
        )

        components.push({
          ...currentComponent,
          api: componentApi,
          elements: componentDescendants,
          store: componentStore,
        })
        currentElements.push(...componentDescendants2)
      }

      elementsCurrentBatch = currentElements

      currentRun++
    } while (elementsCurrentBatch.length > 0 && currentRun < maxRuns)

    const store = await this.commandBus.execute<
      ExportStoreCommand,
      IStoreExport
    >(new ExportStoreCommand({ id: page.store.id }))

    return { components, elements, store }
  }
}
