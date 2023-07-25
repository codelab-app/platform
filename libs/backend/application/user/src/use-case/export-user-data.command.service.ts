import type { AppWhere } from '@codelab/backend/abstract/codegen'
import type { IUserDataExport } from '@codelab/backend/abstract/core'
import { ExportAppsCommand } from '@codelab/backend/application/app'
import { exportResources } from '@codelab/backend/application/resource'
import type { TypesToExport } from '@codelab/backend/application/type'
import { UserRepository } from '@codelab/backend/domain/user'
import type { IAuth0User } from '@codelab/shared/abstract/core'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'

const nameComparator = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name)

const keyComparator = (a: { key: string }, b: { key: string }) =>
  a.key.localeCompare(b.key)

// sort data before export to provide consistent export each time
// const sortExportData = (exportData: IUserDataExport) => {
//   const { apps, components, resources } = exportData

//   apps.sort(nameComparator)
//   components.sort(nameComparator)
//   resources.sort(nameComparator)
//   apps.forEach(({ pages }) => pages.sort(nameComparator))
//   components.forEach(({ api }) => api.fields.sort(keyComparator))

//   return exportData
// }

export class ExportUserDataCommand {
  constructor(public owner: IAuth0User) {}
}

@CommandHandler(ExportUserDataCommand)
export class ExportUserDataHandler
  implements ICommandHandler<ExportUserDataCommand, void>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: ExportUserDataCommand) {
    const { owner } = command
    /**
     * Get all apps of user
     */
    const user = await this.userRepository.findOne(owner)
    const appIds = user?.apps.map((app) => app.id)

    await this.commandBus.execute(new ExportAppsCommand({ id_IN: appIds }))

    /**
     * Export user types
     */
  }

  // getUserTypes(): TypesToExport {}
}

// export const exportUserData = async (where: AppWhere) => {
//   // const typesData = await exportUserTypes()
//.  const appsData = await exportApps(where)
//   const resourcesData = await exportResources()
//   const components = await exportComponents(where)

//   const exportData: IUserDataExport = {
//     apps: appsData,
//     components,
//     resources: resourcesData,
//     ...typesData,
//   }

//   return sortExportData(exportData)
// }
