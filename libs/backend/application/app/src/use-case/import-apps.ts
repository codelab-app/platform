import type { IAppExport } from '@codelab/backend/abstract/core'
import { importDomains } from '@codelab/backend/application/domain'
import { createApp } from '@codelab/backend/domain/app'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
import { logSection, logTask } from '@codelab/shared/utils'

export const importApps = async (
  apps: Array<IAppExport> = [],
  owner: IAuth0Owner,
) => {
  logSection('Importing App')

  for (const app of apps) {
    const importedApp = await createApp(app, owner)

    logTask('Imported App', importedApp.name)

    for await (const domain of app.domains) {
      await importDomains(domain)
    }
  }
}
