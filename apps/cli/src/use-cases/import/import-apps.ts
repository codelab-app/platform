import { IAppExport } from '@codelab/shared/abstract/core'
import { createApp } from '../../repository/app.repo'
import { logSection, logTask } from '../../shared/utils/log-task'
import { importDomains } from './import-domains'

export const importApps = async (
  apps: Array<IAppExport> = [],
  userId: string,
) => {
  logSection('Importing App')

  for (const app of apps) {
    const importedApp = await createApp(app, userId)

    logTask('Imported App', importedApp.name)

    for await (const domain of app.domains) {
      await importDomains(domain)
    }
  }
}
