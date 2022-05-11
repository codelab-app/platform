import { IAppExport } from '@codelab/shared/abstract/core'
import { createApp } from '../../repository/app.repo'

export const importApp = async (
  apps: Array<IAppExport> = [],
  userId: string,
) => {
  console.log('Importing app...')

  for (const app of apps) {
    const importedApp = await createApp(app, userId)

    console.info(`Imported app with id ${importedApp.id}`)
  }
}
