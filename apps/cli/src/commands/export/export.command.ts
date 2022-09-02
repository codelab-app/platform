import {
  IAppExport,
  IAtomExport,
  IDomainExport,
  IResourceExport,
  ITagExport,
  ITypeExport,
} from '@codelab/shared/abstract/core'
import { config } from 'dotenv'
import inquirer from 'inquirer'
import yargs, { CommandModule } from 'yargs'
import { exportSeedData } from './export-seed-data'
import { exportUserData } from './export-user-data'

config({ path: `${process.cwd()}/.env` })

export type ExportedData = {
  app: IAppExport | null
  domains: Array<IDomainExport>
  atoms: Array<IAtomExport>
  types: Array<ITypeExport>
  resources: Array<IResourceExport>
  tags: Array<ITagExport>
}

/**
 * Entry point for all export. Show users a list of questions such as
 *
 * - Which apps to export, can select none as well
 * - Whether to include types
 *
 */
export const exportCommand: CommandModule<any, any> = {
  command: 'export',
  describe: 'Export user data',
  handler: async () => {
    const confirmExportSeedData = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        default: false,
        message: 'Would you like to export seed data?',
      },
    ])

    if (confirmExportSeedData['confirm']) {
      await exportSeedData()
    }

    await exportUserData()

    yargs.exit(0, null!)
  },
}
