import { AppOGM, UserOGM } from '@codelab/backend/adapter/neo4j'
import inquirer from 'inquirer'
import yargs, { CommandModule } from 'yargs'
import { exportSeedData } from '../../use-cases/export/export-seed-data'
import { exportUserData } from '../../use-cases/export/export-user-data'
import { saveExportFile } from '../../use-cases/export/save-export-file'
import { seedFilePath } from '../import/config'

/**
 * Entry point for all export. Show users a list of questions such as
 *
 * - Which apps to export, can select none as well
 * - Whether to include types
 *
 */
export const exportCommand: CommandModule<
  unknown,
  unknown
  // { userData: boolean; seedData: boolean }
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
    // userData: {
    //   alias: 'user',
    //   describe: 'User data to be exported',
    //   demandOption: true,
    //   type: 'boolean',
    // },
    // seedData: {
    //   alias: 'seed',
    //   describe: 'Seed data to be exported',
    //   demandOption: true,
    //   type: 'boolean',
    //   // default: seedFilePath,
    // },
  },
  handler: async () => {
    const App = await AppOGM({ reinitialize: true })
    const apps = await App.find()
    const User = await UserOGM({ reinitialize: true })
    const users = await User.find()

    const { confirmExportSeedData, confirmExportUserData } =
      await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmExportSeedData',
          default: false,
          message: 'Would you like to export seed data?',
        },
        {
          type: 'confirm',
          name: 'confirmExportUserData',
          default: false,
          message: 'Would you like to export user data?',
        },
      ])

    // Exit early if no apps to export
    if (confirmExportUserData && !apps.length) {
      console.log('No app exists')
      yargs.exit(0, null!)
    }

    if (confirmExportSeedData) {
      const seedData = await exportSeedData()
      await saveExportFile(seedData, seedFilePath)
    }

    if (confirmExportUserData) {
      const { selectedUser, selectedApp } = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedUser',
          message: 'Select which user to be owner of the app',
          choices: users.map((user) => ({
            name: user.email,
            value: user.id,
          })),
        },
        {
          type: 'list',
          name: 'selectedApp',
          message: 'Select which app to export',
          choices: apps.map((app) => ({
            name: app.name,
            value: app.id,
          })),
        },
      ])

      const userData = await exportUserData({
        appIds: [selectedApp.id],
      })

      await saveExportFile(
        userData,
        `${selectedUser.username}-${Date.now()}.json`,
      )
    }

    yargs.exit(0, null!)
  },
}
