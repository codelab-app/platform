import { AppOGM, IAppModel } from '@codelab/backend'
import { IAppExport } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { importComponent } from './import-component'
import { importElementInitial, updateImportedElement } from './import-element'
import { validate } from './validate'

export const importApp = async (
  app: IAppExport,
  selectedUser: string,
  // idMap: Map<string, string>,
) => {
  const App = await AppOGM()
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

  const {
    apps: [importedApp],
  } = await App.create({
    input: [
      {
        id: app.id,
        name: `${app.name} - Imported at ${new Date().toISOString()}`,
        owner: { connect: { where: { node: { id: selectedUser } } } as any },
        rootProviderElement: {
          connect: {
            where: { node: { id: idMap.get(app.rootProviderElement.id) } },
          },
        },
        pages: {
          create: app.pages.map((page) => ({
            node: {
              id: v4(),
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

  return importedApp
}
