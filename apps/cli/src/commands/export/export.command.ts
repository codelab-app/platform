import {
  IAppExport,
  IAtomExport,
  IResourceExport,
  ITagExport,
  ITypeExport,
} from '@codelab/shared/abstract/core'
import { config } from 'dotenv'
import yargs, { CommandModule } from 'yargs'
import { exportSeedData } from '../../use-cases/export/export-seed-data'
import { exportUserData } from '../../use-cases/export/export-user-data'

config({ path: `${process.cwd()}/.env` })

export type ExportedData = {
  apps: Array<IAppExport>
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
export const exportCommand: CommandModule<
  any,
  { userData: boolean; seedData: boolean }
> = {
  command: 'export',
  describe: 'Export user data',
  // builder: (args) => {
  //   return yargs.option('u', {
  //     alias: 'url',
  //     describe: 'the URL to make an HTTP request to',
  //   })
  // },
  builder: {
    userData: {
      alias: 'user',
      describe: 'User data to be exported',
      demandOption: true,
      type: 'boolean',
    },
    seedData: {
      alias: 'seed',
      describe: 'Seed data to be exported',
      demandOption: true,
      type: 'boolean',
      // default: seedFilePath,
    },
  },
  handler: async ({ userData, seedData }) => {
    console.log(userData, seedData)

    const exportData = {}

    if (seedData) {
      Object.assign(exportData, await exportSeedData())
    }

    if (userData) {
      Object.assign(exportData, await exportUserData())
    }

    /**
     * We log the data back to stdout so we can return to the API call
     */
    console.log(exportData)

    yargs.exit(0, null!)
  },
}
