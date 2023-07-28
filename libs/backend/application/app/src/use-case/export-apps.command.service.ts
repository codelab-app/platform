import type { App, AppWhere, Page } from '@codelab/backend/abstract/codegen'
import type { IAppExport } from '@codelab/backend/abstract/core'
import { AppRepository } from '@codelab/backend/domain/app'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PageRepository } from '@codelab/backend/domain/page'
import { uuidRegex } from '@codelab/shared/utils'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandHandler } from '@nestjs/cqrs'
import flatMap from 'lodash/flatMap'

export class ExportAppsCommand {
  constructor(public where: AppWhere) {}
}

@CommandHandler(ExportAppsCommand)
export class ExportAppsHandler
  implements ICommandHandler<ExportAppsCommand, Array<IAppExport>>
{
  constructor(
    private readonly appRepository: AppRepository,
    private readonly pageRepository: PageRepository,
    private readonly elementRepository: ElementRepository,
    private readonly componentRepository: ComponentRepository,
  ) {}

  async execute(command: ExportAppsCommand) {
    const { where } = command
    const apps = await this.appRepository.find({ where })

    return apps.reduce(async (appsData, app) => {
      const pagesData = await this.getAppPages(app)

      const appExport = {
        app,
        domains: app.domains,
        id: app.id,
        name: app.name,
        pages: pagesData,
        slug: app.slug,
      }

      return [...(await appsData), appExport]
    }, Promise.resolve<Array<IAppExport>>([]))
  }

  private async getAppPages(app: App) {
    const pages = await this.pageRepository.find({
      where: { app: { id: app.id } },
    })

    const pagesData = await Promise.all(
      pages.map(async (page) => {
        const { elements } = await this.getPageData(page)

        const {
          id,
          kind,
          name,
          pageContentContainer,
          rootElement,
          store,
          url,
        } = page

        return {
          elements,
          id: id,
          kind: kind,
          name: name,
          rootElement: {
            id: rootElement.id,
            name: rootElement.name,
          },
          store,
          url,
          ...(pageContentContainer ? { pageContentContainer } : {}),
        }
      }),
    )

    return pagesData
  }

  async getPageData(page: Page) {
    const elements = await this.elementRepository.getElementWithDescendants(
      page.rootElement.id,
    )

    const componentIds = flatMap(elements, (element) => [
      element.parentComponent?.id,
      element.renderComponentType?.id,
      element.childMapperComponent?.id,
      ...(element.props.data.match(uuidRegex) || []),
    ]).filter((element): element is string => Boolean(element))

    const components = await this.componentRepository.find({
      where: { id_IN: componentIds },
    })

    for (const { rootElement } of components) {
      const componentDescendants =
        await this.elementRepository.getElementWithDescendants(rootElement.id)

      elements.push(...componentDescendants)
    }

    return { components, elements }
  }
}
