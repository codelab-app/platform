import * as inquirer from 'inquirer'
import { exportApp } from '../../use-cases/export/export-app'
import { exportUserTypes } from '../../use-cases/export/export-user-types'
import { saveExportFile } from '../../use-cases/export/save-export-file'
import type { ExportedData } from './export.command'

export const exportUserData = async () => {
  const confirmExportApp = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Would you like to export Apps',
    },
  ])

  const confirmExportType = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Would you like to export Types',
    },
  ])

  // App
  const appData = confirmExportApp['confirm']
    ? await exportApp()
    : { app: null }

  // Types
  const typeData = confirmExportType ? await exportUserTypes() : { types: [] }

  const exportData: Omit<ExportedData, 'atoms'> = {
    ...appData,
    ...typeData,
  }

  if (confirmExportApp['confirm'] || confirmExportType['confirm']) {
    await saveExportFile(exportData)
  }
}
