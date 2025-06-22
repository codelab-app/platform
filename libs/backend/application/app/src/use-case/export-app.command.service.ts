import type {
  IAppAggregate,
  IComponentAggregate,
  IElementExport,
  IPageAggregate,
  IRef,
} from '@codelab/shared-abstract-core'
import type { AppWhere } from '@codelab/shared-infra-gqlgen'
import type { ICommandHandler } from '@nestjs/cqrs'

import { ExportComponentCommand } from '@codelab/backend-application-component'
import { ExportPageCommand } from '@codelab/backend-application-page'
import { AppRepository } from '@codelab/backend-domain-app'
import { ComponentRepository } from '@codelab/backend-domain-component'
import { DomainRepository } from '@codelab/backend-domain-domain'
import { ResourceRepository } from '@codelab/backend-domain-resource'
import {
  AppAggregateSchema,
  IActionKind,
  IElementRenderTypeKind,
} from '@codelab/shared-abstract-core'
import { Validator } from '@codelab/shared-infra-typebox'
import { uuidRegex } from '@codelab/shared-utils'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import { unique } from 'radash'

export class ExportAppCommand {
  constructor(public where: AppWhere) {}
}

@CommandHandler(ExportAppCommand)
export class ExportAppHandler
  implements ICommandHandler<ExportAppCommand, IAppAggregate>
{
  constructor(
    private readonly appRepository: AppRepository,
    private readonly domainRepository: DomainRepository,
    private readonly componentRepository: ComponentRepository,
    private readonly resourceRepository: ResourceRepository,
    private commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportAppCommand) {
    const app = await this.appRepository.findOneOrFail({ where })

    const domains = await this.domainRepository.find({
      where: { app: { id: where.id } },
    })

    const pages: Array<IPageAggregate> = await this.commandBus.execute<
      ExportPageCommand,
      Array<IPageAggregate>
    >(new ExportPageCommand({ id_IN: app.pages.map((page) => page.id) }))

    return Validator.parse(AppAggregateSchema, {
      app: { id: app.id, name: app.name },
      components: await this.components(pages),
      domains,
      pages,
      resources: await this.resources(pages),
    })
  }

  private async components(pages: Array<IPageAggregate>) {
    const components: Array<IComponentAggregate> = []

    for (const { page } of pages) {
      // TODO: need to create a separate query that contains descendants
      // This can access the resolvers
      // const elements = page.rootElement.descendants
      const elements: Array<IElementExport> = []
      // const elements = (
      //   await this.elementRepository.getElementWithDescendants(
      //     page.rootElement.id,
      //   )
      // ).map((element: Element) => ({
      //   ...element,
      //   renderType: {
      //     __typename: Validator.parseDefined(element.renderType.__typename),
      //     id: element.renderType.id,
      //   },
      // }))
      let elementsCurrentBatch: Array<IElementExport> = elements

      // get all components and nested components that are used in the page including their elements
      do {
        const componentIds = unique(
          elementsCurrentBatch
            .flatMap((element) => [
              element.parentComponent?.id,
              element.renderType.__typename === IElementRenderTypeKind.Component
                ? element.renderType.id
                : null,
              element.childMapperComponent?.id,
              ...((element.props.data as string).match(uuidRegex) || []),
            ])
            .filter(
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
            IComponentAggregate
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

    return components
  }

  private async resources(pages: Array<IPageAggregate>) {
    const pageStores = pages.map((page) => page.store)

    const pageResourceRefs = pageStores.reduce<Array<IRef>>((acc, store) => {
      const { actions } = store

      const apiActions = actions.filter(
        (action) => action.__typename === IActionKind.ApiAction,
      )

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
    }, [])

    const resources = await this.resourceRepository.find({
      where: { id_IN: pageResourceRefs.map((ref) => ref.id) },
    })

    return resources
  }
}
