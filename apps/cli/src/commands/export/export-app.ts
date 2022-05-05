import { AppOGM, appSelectionSet } from '@codelab/backend'
import { IAppExport } from '@codelab/shared/abstract/core'
import * as inquirer from 'inquirer'
import { getApp } from '../../repository/app.repo'

export type ExportAppData = {
  app: IAppExport
}

export const exportApp = async () => {
  /**
   * Select app for export
   */
  const App = await AppOGM()

  const apps = await App.find({
    selectionSet: appSelectionSet,
  })

  const confirmExportApp = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Would you like to export Apps',
    },
  ])

  /**
   * Whether we want to export app or not
   */
  if (confirmExportApp['confirm']) {
    const selection = await inquirer.prompt([
      {
        type: 'list',
        name: 'app',
        message: 'Select an App to export',
        choices: apps.map((app) => ({
          name: app.name,
          value: app.id,
        })),
      },
    ])

    const app = apps.find((a) => a.id === selection.app)

    if (!app) {
      throw new Error('App not found')
    }

    return await getApp(app)
  }

  return { app: null }
}
