import {
  AppOGM,
  AtomOGM,
  IAppModel,
  IAtomModel,
  IComponentModel,
  IElementModel,
  IPageModel,
  UserOGM,
} from '@codelab/backend'
import { IPageExport } from '@codelab/shared/abstract/core'
import { config } from 'dotenv'
import fs from 'fs'
import * as inquirer from 'inquirer'
import { flatMap } from 'lodash'
import path from 'path'
import { v4 } from 'uuid'
import yargs, { CommandModule } from 'yargs'
import { ExportAppData } from '../export/get-app'
import { importApp } from './import-app'
import { importComponent } from './import-component'
import { importElementInitial, updateImportedElement } from './import-element'

/**
 * Will process json file, and import apps/types accordingly based on their existence
 */
export const importCommand: CommandModule<any, any> = {
  command: 'import <filePath>',
  handler: async ({ filePath }) => {
    config({ path: `${process.cwd()}/.env` })

    const json = fs.readFileSync(path.resolve('data', filePath), 'utf8')
    const Users = await UserOGM()
    const allUsers = await Users.find()

    const { selectedUser } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedUser',
        message: 'Select which user to be owner of the app',
        choices: allUsers.map((user) => ({
          name: user.email,
          value: user.id,
        })),
      },
    ])

    const { app } = JSON.parse(json) as ExportAppData
    const { pages, providerElements } = app

    await validate(pages)

    const idMap = new Map<string, string>()

    for (const element of providerElements) {
      const newElement = await importElementInitial(element, idMap)

      idMap.set(element.id, newElement.id)
    }

    for (const element of providerElements) {
      await updateImportedElement(element, idMap)
    }

    for (const { elements, components } of pages) {
      for (const component of components) {
        const newComponent = await importComponent(component, selectedUser)

        idMap.set(component.id, newComponent.id)
      }

      for (const element of elements) {
        const newElement = await importElementInitial(element, idMap)

        idMap.set(element.id, newElement.id)
      }

      for (const element of elements) {
        await updateImportedElement(element, idMap)
      }
    }

    const importedApp = await importApp(app, selectedUser, idMap)

    console.info(`Imported app with id ${importedApp.id}`)
    yargs.exit(0, null!)
  },
}

const validate = async (pages: Array<IPageExport>) => {
  const Atoms = await AtomOGM()

  let allAtomIds = flatMap(
    pages,
    (page) =>
      page.elements.map((e) => e.atom?.id).filter(Boolean) as Array<string>,
  )

  allAtomIds = [...new Set(allAtomIds)]

  const foundAtoms = await Atoms.find({
    where: { id_IN: allAtomIds },
  })

  const foundAtomsMap = new Map<string, IAtomModel>(
    foundAtoms.map((f) => [f.id, f]),
  )

  const notFound = allAtomIds.filter((id) => !foundAtomsMap.has(id))

  if (notFound.length) {
    throw new Error(`Can't find Atoms with ids "${notFound.join(', ')}"`)
  }
}
