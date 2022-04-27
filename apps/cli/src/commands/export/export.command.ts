import { config } from 'dotenv'
import yargs, { CommandModule } from 'yargs'
import { exportApp } from './export-app'
import { exportType } from './export-type'

config({ path: `${process.cwd()}/.env` })

/**
 * Entry point for all export. Show users a list of questions such as
 *
 * - Which apps to export, can select none as well
 * - Whether to include types
 *
 */
export const exportCommand: CommandModule<any, any> = {
  command: 'export',

  handler: async () => {
    await exportApp()

    await exportType()

    yargs.exit(0, null!)
  },
}
