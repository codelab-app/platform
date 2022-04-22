import { AppModel, appSelectionSet } from '@codelab/backend'
import { config } from 'dotenv'
import fs from 'fs'
import * as inquirer from 'inquirer'
import path from 'path'
import yargs, { CommandModule } from 'yargs'
import { getAppData } from './export-app'

config({ path: `${process.cwd()}/.env` })

export const exportAppCommand: CommandModule<any, any> = {
  command: 'export-app',

  handler: async () => {
    const App = await AppModel()

    const apps = await App.find({
      selectionSet: appSelectionSet,
    })

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

    const { outputPath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'outputPath',
        message: 'Enter a path to export to',
        default: `${app.name ?? 'app'}.json`,
      },
    ])

    if (!outputPath.endsWith('.json')) {
      throw new Error('Output path must end with .json')
    }

    const data = await getAppData(app)
    const json = JSON.stringify(data, null, 2)

    fs.writeFileSync(path.resolve('data', outputPath), json)

    yargs.exit(0, null!)
  },
}
