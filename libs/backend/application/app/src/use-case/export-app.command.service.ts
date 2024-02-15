import type { AppWhere, Element } from '@codelab/backend/abstract/codegen'
import { ExportComponentCommand } from '@codelab/backend/application/component'
import { ExportPageCommand } from '@codelab/backend/application/page'
import { AppRepository } from '@codelab/backend/domain/app'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { ResourceRepository } from '@codelab/backend/domain/resource'
import type {
  IApiAction,
  IAppBoundedContext,
  IComponentBoundedContext,
  IElement,
  IPageBoundedContext,
  IRef,
} from '@codelab/shared/abstract/core'
import {
  IActionKind,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { throwIfUndefined, uuidRegex } from '@codelab/shared/utils'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import flatMap from 'lodash/flatMap'
import uniq from 'lodash/uniq'

export class ExportAppCommand {
  constructor(public where: AppWhere) {}
}

@CommandHandler(ExportAppCommand)
export class ExportAppHandler
  implements ICommandHandler<ExportAppCommand, IAppBoundedContext>
{
  constructor(
    private readonly appRepository: AppRepository,
    private readonly componentRepository: ComponentRepository,
    private readonly elementRepository: ElementRepository,
    private readonly resourceRepository: ResourceRepository,
    private commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportAppCommand) {
    const app = await this.appRepository.findOne(where)

    if (!app) {
      throw new Error('Cannot find App')
    }

    const pages = await this.commandBus.execute<
      ExportPageCommand,
      Array<IPageBoundedContext>
    >(new ExportPageCommand({ id_IN: app.pages.map((page) => page.id) }))

    const pageStoresContexts = pages.map((pageContext) => pageContext.store)

    const pageResourceRefs = pageStoresContexts.reduce<Array<IRef>>(
      (acc, storeContext) => {
        const { actions } = storeContext.store

        const apiActions = actions.filter(
          (action) => action.__typename === IActionKind.ApiAction,
        ) as Array<IApiAction>

        if (apiActions.length > 0) {
          const apiActionResources = apiActions.map(
            (apiAction) => apiAction.resource,
          )

          acc.push(
            ...apiActionResources.filter(
              (resource) => !acc.some((res) => res.id === resource.id),
            ),
          )
        }

        return acc
      },
      [],
    )

    const resources = await this.resourceRepository.find({
      where: { id_IN: pageResourceRefs.map((ref) => ref.id) },
    })

    const components: Array<IComponentBoundedContext> = []

    for (const { page } of pages) {
      const elements = (
        await this.elementRepository.getElementWithDescendants(
          page.rootElement.id,
        )
      ).map((element: Element) => ({
        ...element,
        renderType: {
          __typename: throwIfUndefined(element.renderType.__typename),
          id: element.renderType.id,
        },
      }))

      let elementsCurrentBatch: Array<IElement> = elements

      // get all components and nested components that are used in the page including their elements
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
              Boolean(id) &&
              !components.some(({ component }) => component.id === id),
          ),
        )

        const currentComponents = await this.componentRepository.find({
          where: { id_IN: componentIds },
        })

        elementsCurrentBatch = []

        for (const currentComponent of currentComponents) {
          const component = await this.commandBus.execute<
            ExportComponentCommand,
            IComponentBoundedContext
          >(new ExportComponentCommand(currentComponent.id))

          components.push(component)
          elementsCurrentBatch.push(...component.elements)
        }
      } while (elementsCurrentBatch.length > 0)

      // put components that are referenced from an element via field childMapperComponent first
      // so that they are imported before the elements or another component's root element that reference them
      components.sort(({ component }) => {
        return elements.some(
          (element) => element.childMapperComponent?.id === component.id,
        )
          ? 1
          : -1
      })
    }

    return {
      app,
      components,
      pages,
      resources,
    }
  }
}
