import { AppOGM } from '@codelab/backend'
import { IAppExport } from '@codelab/shared/abstract/core'
import { cLog } from '@codelab/shared/utils'
import { omit } from 'lodash'
import { v4 } from 'uuid'
import { importComponent } from './import-component'
import { importElementInitial, updateImportedElement } from './import-element'
import { validate } from './validate'

export const importApp = async (app: IAppExport, selectedUser: string) => {
  cLog(omit(app, ['pages']))

  const App = await AppOGM()
  const { pages, providerElements } = app
  await validate(pages)

  for (const { elements, components } of pages) {
    for (const component of components) {
      const newComponent = await importComponent(component, selectedUser)
    }

    for (const element of elements) {
      const newElement = await importElementInitial(element)
    }

    for (const element of elements) {
      await updateImportedElement(element)
    }
  }

  for (const element of providerElements) {
    const newElement = await importElementInitial(element)
  }

  for (const element of providerElements) {
    await updateImportedElement(element)
  }

  const pagesData = app.pages.map(({ elements, components, ...props }) => ({
    ...props,
  }))

  cLog(pagesData)

  const existing = await App.find({
    where: {
      id: app.id,
    },
  })

  if (existing.length) {
    console.log('Deleting app/pages before re-creating...')
    await App.delete({
      where: {
        id: app.id,
      },
      delete: {
        pages: [{ where: {} }],
      },
    })
  }

  console.log('Creating new app...')

  const {
    apps: [importedApp],
  } = await App.create({
    input: [
      {
        id: app.id,
        name: app.name,
        owner: { connect: { where: { node: { id: selectedUser } } } },
        rootProviderElement: {
          connect: {
            where: { node: { id: app.rootProviderElement.id } },
          },
        },
        pages: {
          create: app.pages.map((page) => ({
            node: {
              id: page.id ?? v4(),
              name: page.name,
              rootElement: {
                connect: {
                  where: { node: { id: page.rootElement.id } },
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
