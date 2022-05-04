import { AppOGM, IAppModel } from '@codelab/backend'
import { IAppExport } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const importApp = async (
  app: IAppExport,
  selectedUser: string,
  idMap: Map<string, string>,
) => {
  const App = await AppOGM()

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
