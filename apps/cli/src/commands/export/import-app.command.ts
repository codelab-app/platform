import {
  App as IAppModel,
  AppModel,
  Atom as IAtomModel,
  AtomModel,
  Component as IComponentModel,
  ComponentModel,
  Element as IElementModel,
  ElementModel,
  Page as IPageModel,
  UserModel,
} from '@codelab/backend'
import { config } from 'dotenv'
import fs from 'fs'
import * as inquirer from 'inquirer'
import { flatMap } from 'lodash'
import yargs, { CommandModule } from 'yargs'

interface PagePack {
  page: IPageModel
  components: Array<IComponentModel>
  elements: Array<IElementModel>
}

export const importAppCommand: CommandModule<any, any> = {
  command: 'import-app <filePath>',
  handler: async ({ filePath }) => {
    config({ path: `${process.cwd()}/.env` })

    const json = fs.readFileSync(filePath, 'utf8')
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

// Creates the element without prop map bindings and without parent/children connections
const importElementInitial = async (
  element: IElementModel,
  idMap: Map<string, string>,
): Promise<IElementModel> => {
  const Elements = await ElementModel()

  const {
    elements: [newElement],
  } = await Elements.create({
    input: [
      {
        name: element.name,
        css: element.css,
        atom: element.atom
          ? { connect: { where: { node: { id: element.atom.id } } } }
          : undefined,
        component: element.component
          ? {
              connect: {
                where: { node: { id: idMap.get(element.component.id) } },
              },
            }
          : undefined,
        instanceOfComponent: element.instanceOfComponent
          ? {
              connect: {
                where: { node: { id: element.instanceOfComponent.id } },
              },
            }
          : undefined,
        props: element.props
          ? {
              create: { node: { data: element.props.data } },
            }
          : undefined,
        propTransformationJs: element.propTransformationJs,
        renderForEachPropKey: element.renderForEachPropKey,
        renderIfPropKey: element.renderIfPropKey,
      },
    ],
  })

  return newElement
}

// Updates the imported element with prop map bindings, parent/children connections and props after we have
// imported all the elements, so we can reference them
const updateImportedElement = async (
  element: IElementModel,
  idMap: Map<string, string>,
): Promise<void> => {
  const Elements = await ElementModel()

  if (element.props) {
    // replace all references in props
    for (const [key, value] of idMap.entries()) {
      element.props.data = element.props.data.replace(
        new RegExp(key, 'g'),
        value,
      )
    }
  }

  await Elements.update({
    where: { id: idMap.get(element.id) },
    update: {
      parentElement: element.parentElement
        ? {
            disconnect: { where: {} },
            connect: {
              edge: { order: element.parentElementConnection?.edges[0].order },
              where: { node: { id: idMap.get(element.parentElement.id) } },
            },
          }
        : undefined,
      props: element.props
        ? {
            update: { node: { data: element.props.data } },
          }
        : undefined,
      propMapBindings: element.propMapBindings.map((pmb) => ({
        create: [
          {
            node: {
              sourceKey: pmb.sourceKey,
              targetKey: pmb.targetKey,
              targetElement: pmb.targetElement
                ? {
                    connect: {
                      where: {
                        node: { id: idMap.get(pmb.targetElement.id) },
                      },
                    },
                  }
                : undefined,
            },
          },
        ],
      })),
    },
  })
}

const importComponent = async (
  component: IComponentModel,
  selectedUser: string,
): Promise<IComponentModel> => {
  const Components = await ComponentModel()

  const {
    components: [newComponent],
  } = await Components.create({
    input: [
      {
        name: component.name,
        owner: { connect: { where: { node: { id: selectedUser } } } },
        rootElement: { create: { node: { name: '' } } },
      },
    ],
  })

  return newComponent
}
