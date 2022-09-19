import { AppOGM } from '@codelab/backend/adapter/neo4j'
import inquirer from 'inquirer'
import yargs, { CommandModule } from 'yargs'
import { selectUserPrompt } from '../../shared/prompts/selectUser'
import { exportSeedData } from '../../use-cases/export/export-seed-data'
import { exportUserData } from '../../use-cases/export/export-user-data'
import { saveExportFile } from '../../use-cases/export/save-export-file'

interface ExportProps {
  seedData?: string
  userData?: string
  skipUserData?: boolean
}

/**
 * Entry point for all export. Show users a list of questions such as
 *
 * - Which apps to export, can select none as well
 * - Whether to include types
 *
 */
export const exportCommand: CommandModule<ExportProps, ExportProps> = {
  command: 'export',
  describe: 'Export user data',
  // builder: (args) => {
  //   return yargs.option('u', {
  //     alias: 'url',
  //     describe: 'the URL to make an HTTP request to',
  //   })
  // },
  builder: (argv) =>
    argv.options({
      skipUserData: {
        // alias: 's',
        describe: 'Skip user data',
        type: 'boolean',
      },
      skipSeedData: {
        // alias: 's',
        describe: 'Skip seed data',
        type: 'boolean',
      },
      userData: {
        alias: 'user',
        describe: 'File path of the user data to be exported',
        // demandOption: true,
        type: 'string',
      },
      seedData: {
        alias: 'seed',
        describe: 'File path of the seed data to be exported',
        // demandOption: true,
        type: 'string',
        // default: defaultSeedFilePath,
      },
    }),
  handler: async ({ skipSeedData, skipUserData, seedData, userData }) => {
    const App = await AppOGM({ reinitialize: true })
    const apps = await App.find()

    const seedDataFilePath: string | null = skipSeedData
      ? null
      : seedData ??
        (
          await inquirer.prompt([
            {
              type: 'confirm',
              name: 'confirm',
              default: false,
              message: 'Would you like to export seed data?',
            },
          ])
        ).confirm

    const userDataFilePath: string | null = skipUserData
      ? null
      : userData ??
        (
          await inquirer.prompt([
            {
              type: 'confirm',
              name: 'confirm',
              default: false,
              message: 'Would you like to export user data?',
            },
          ])
        ).confirm

    // Exit early if no apps to export
    if (userDataFilePath && !apps.length) {
      console.log('No app exists')
      yargs.exit(0, null!)
    }

    if (seedDataFilePath) {
      const exportedSeedData = await exportSeedData()

      /**
       * Export info, file path etc
       */
      const outputFilePath =
        seedDataFilePath ??
        (
          await inquirer.prompt([
            {
              type: 'input',
              name: 'outputFilePath',
              message: 'Enter a path to export to, relative to ./data',
              default: `user-data-${Date.now()}.json`,
            },
          ])
        ).outputFilePath

      await saveExportFile(exportedSeedData, outputFilePath)
    }

    if (userDataFilePath) {
      const { selectedUserId, selectedApp } = await inquirer.prompt([
        await selectUserPrompt(),
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

      const exportedUserData = await exportUserData({
        appIds: [selectedApp.id],
      })

      await saveExportFile(
        exportedUserData,
        `${selectedUserId}-${Date.now()}.json`,
      )
    }

    yargs.exit(0, null!)
  },
}
