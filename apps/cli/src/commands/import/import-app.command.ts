import {
  App as IAppModel,
  AppModel,
  Atom as IAtomModel,
  AtomModel,
  Component as IComponentModel,
  Element as IElementModel,
  Page as IPageModel,
  UserModel,
} from '@codelab/backend'
import { config } from 'dotenv'
import fs from 'fs'
import * as inquirer from 'inquirer'
import { flatMap } from 'lodash'
import path from 'path'
import yargs, { CommandModule } from 'yargs'
import { importComponent } from './import-component'
import { importElementInitial, updateImportedElement } from './import-element'

interface PagePack {
  page: IPageModel
  components: Array<IComponentModel>
  elements: Array<IElementModel>
}

export const importAppCommand: CommandModule<any, any> = {
  command: 'import-app <filePath>',
  handler: async ({ filePath }) => {
    config({ path: `${process.cwd()}/.env` })

    const json = fs.readFileSync(path.resolve('data', filePath), 'utf8')
    const Apps = await AppModel()
    const Users = await UserModel()
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

    const { pages, app, providerElements } = JSON.parse(json) as {
      app: IAppModel
      pages: Array<PagePack>
      providerElements: Array<IElementModel>
    }

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

    const {
      apps: [importedApp],
    } = await Apps.create({
      input: [
        {
          name: `${app.name} - Imported at ${new Date().toISOString()}`,
          owner: { connect: { where: { node: { id: selectedUser } } } as any },
          rootProviderElement: {
            connect: {
              where: { node: { id: idMap.get(app.rootProviderElement.id) } },
            } as any,
          },
          pages: {
            create: pages.map(({ page }) => ({
              node: {
                name: page.name,
                rootElement: {
                  connect: {
                    where: { node: { id: idMap.get(page.rootElement.id) } },
                  },
                },
              },
            })),
          },
        },
      ],
    })

    console.log(`Imported app with id ${importedApp.id}`)
    yargs.exit(0, null!)
  },
}

const validate = async (pages: Array<PagePack>) => {
  const Atoms = await AtomModel()

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
