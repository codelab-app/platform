import {
  App as IAppModel,
  AppModel,
  ComponentModel,
  componentSelectionSet,
  elementGraph,
  ElementModel,
  elementSelectionSet,
  Page as IPageModel,
  PageModel,
  pageSelectionSet,
} from '@codelab/backend'
import { config } from 'dotenv'
import fs from 'fs'
import * as inquirer from 'inquirer'
import { flatMap, flatten } from 'lodash'
import yargs, { CommandModule } from 'yargs'

const appSelectionSet = `{ id, name, rootProviderElement { id } }`

export const exportAppCommand: CommandModule<any, any> = {
  command: 'export-app',

  handler: async () => {
    config({ path: `${process.cwd()}/.env` })

    const Apps = await AppModel()

    const apps: Array<IAppModel> = await Apps.find({
      selectionSet: appSelectionSet,
    })

    const selection = await inquirer.prompt([
      {
        type: 'list',
        name: 'app',
        message: 'Select app to export',
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

    fs.writeFileSync(outputPath, json)

    yargs.exit(0, null!)
  },
}

const getAppData = async (app: IAppModel) => {
  // gather all pages, elements and components

  const Pages = await PageModel()

  const pages = await Pages.find({
    where: { app: { id: app.id } },
    selectionSet: pageSelectionSet,
  })

  const pagesData = await Promise.all(
    pages.map(async (page) => {
      const { elements, components } = await getPageData(page)

      return { page, elements, components }
    }),
  )

  const providerElements = await getElementAndDescendants(
    app.rootProviderElement.id,
  )

  return { app, pages: pagesData, providerElements }
}

const getPageData = async (page: IPageModel) => {
  const Components = await ComponentModel()
  const elements = await getElementAndDescendants(page.rootElement.id)

  const componentIds = flatMap(elements, (e) => [
    e.component?.id,
    e.instanceOfComponent?.id,
  ]).filter(Boolean) as Array<string>

  const components = await Components.find({
    where: { id_IN: componentIds },
    selectionSet: componentSelectionSet,
  })

  const componentRootIds = components.map((c) => c.rootElement.id)

  const componentElements = await Promise.all(
    componentRootIds.map((id) => getElementAndDescendants(id)),
  )

  return {
    elements: [...elements, ...flatten(componentElements)],
    components,
  }
}

const getElementAndDescendants = async (rootId: string) => {
  const { id, descendants } = await elementGraph(
    null,
    { input: { rootId } },
    null,
    null as any,
  )

  const elementIds = [id, ...descendants]
  const Elements = await ElementModel()

  return await Elements.find({
    where: { id_IN: elementIds },
    selectionSet: elementSelectionSet,
  })
}
