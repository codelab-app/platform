import type { IAppExport } from '@codelab/backend/abstract/core'
import { createApp } from '@codelab/backend/domain/app'
import { logSection, logTask } from '@codelab/shared/utils'
import { importDomains } from './import-domains'

export const importApps = async (
  apps: Array<IAppExport> = [],
  userId: string,
) => {
  logSection('Importing App')

  for (const app of apps) {
    const importedApp = await createApp(app, userId)

    logTask('Imported App', importedApp?.name)

    for await (const domain of app.domains) {
      await importDomains(domain)
    }
  }
}
