import type { AppWhere } from '@codelab/backend/abstract/codegen'
import { ExportPageCommand } from '@codelab/backend/application/page'
import { AppRepository } from '@codelab/backend/domain/app'
import type {
  IAppExport,
  IComponent,
  IPageExport,
  IResource,
} from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

export class ExportAppsCommand {
  constructor(public where: AppWhere) {}
}

@CommandHandler(ExportAppsCommand)
export class ExportAppsHandler
  implements ICommandHandler<ExportAppsCommand, Array<IAppExport>>
{
  constructor(
    private readonly appRepository: AppRepository,
    private commandBus: CommandBus,
  ) {}

  async execute({ where }: ExportAppsCommand) {
    const apps = await this.appRepository.find({ where })

    return apps.reduce(async (appsData, app) => {
      const pages = await this.commandBus.execute<
        ExportPageCommand,
        Array<IPageExport>
      >(new ExportPageCommand({ id_IN: app.pages.map((page) => page.id) }))

      const resources = pages.reduce<Array<IResource>>((acc, page) => {
        const { resources: pageResources } = page.store

        if (pageResources && pageResources.length > 0) {
          acc.push(
            ...pageResources.filter(
              (resource) => !acc.some((res) => res.id === resource.id),
            ),
          )
        }

        delete page.store.resources

        return acc
      }, [])

      const components = pages.reduce<Array<IComponent>>((acc, page) => {
        const { components: pageComponents } = page

        if (pageComponents && pageComponents.length > 0) {
          acc.push(
            ...pageComponents.filter(
              (component) => !acc.some((comp) => comp.id === component.id),
            ),
          )
        }

        delete page.components

        return acc
      }, [])

      const appExport: IAppExport = {
        ...app,
        components,
        domains: [],
        pages,
        resources,
      }

      return [...(await appsData), appExport]
    }, Promise.resolve<Array<IAppExport>>([]))
  }
}
