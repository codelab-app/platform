import type { App, AppWhere } from '@codelab/backend/abstract/codegen'
import type {
  ExportAppData,
  IAppExport,
  IComponentExport,
  IExportComponents,
} from '@codelab/backend/abstract/core'
import {
  createComponent,
  findComponent,
} from '@codelab/backend/domain/component'
import {
  importElementInitial,
  updateImportedElement,
} from '@codelab/backend/domain/element'
import { getPageData, PageRepository } from '@codelab/backend/domain/page'
import { PropRepository } from '@codelab/backend/domain/prop'
import { StoreRepository } from '@codelab/backend/domain/store'
import {
  FieldRepository,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import {
  appSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IAppDTO, IAuth0Owner } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeIds,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'
import { cLog, createUniqueName } from '@codelab/shared/utils'
import flatMap from 'lodash/flatMap'
import map from 'lodash/map'
import omit from 'lodash/omit'
import { validate } from './validate'

export class AppRepository extends AbstractRepository<IAppDTO, App, AppWhere> {
  private App = Repository.instance.App

  async _find(where: AppWhere = {}) {
    return await (
      await this.App
    ).find({
      selectionSet: appSelectionSet,
      where,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(apps: Array<IAppDTO>) {
    return (
      await (
        await this.App
      ).create({
        input: apps.map(({ id, name, owner, pages }) => ({
          _compoundName: createUniqueName(name, owner.auth0Id),
          id,
          owner: connectAuth0Owner(owner),
          pages: connectNodeIds(pages?.map((page) => page.id)),
        })),
      })
    ).apps
  }

  protected async _update({ name, owner, pages }: IAppDTO, where: AppWhere) {
    return (
      await (
        await this.App
      ).update({
        update: {
          _compoundName: createUniqueName(name, owner.auth0Id),
          pages: reconnectNodeIds(pages?.map((page) => page.id)).map(
            (input) => ({
              ...input,
              // overriding disconnect from reconnectNodeIds because it disconnects everythin
              // including the pages connected in previous items of the input array. This causes
              // the transaction to register only the last page being connected in the input array
              // TODO: Check it it's the case for other places using reconnectNodeIds and if so update it.
              disconnect: [
                {
                  where: {
                    NOT: {
                      node: {
                        id_IN: pages?.map((page) => page.id),
                      },
                    },
                  },
                },
              ],
            }),
          ),
        },
        where,
      })
    ).apps[0]
  }
}

export const createApp = async (app: IAppExport, owner: IAuth0Owner) => {
  cLog(omit(app, ['pages']))

  const fieldRepository = new FieldRepository()
  const storeRepository = new StoreRepository()
  const interfaceTypeRepository = new InterfaceTypeRepository()
  const pageRepository = new PageRepository()
  const appRepository = new AppRepository()
  const App = await Repository.instance.App
  const { pages } = app
  await validate(pages)

  const existing = await appRepository.findOne({ id: app.id })

  if (existing) {
    console.log('Deleting app/pages before re-creating...')
    await App.delete({
      delete: {
        pages: [{ where: {} }],
      },
      where: {
        id: app.id,
      },
    })
  }

  for (const { elements, store } of pages) {
    for (const element of elements) {
      await importElementInitial(element)
    }

    for (const element of elements) {
      await updateImportedElement(element)
    }

    const interfaceTypeExist = await interfaceTypeRepository.findOne({
      id: store.api.id,
    })

    interfaceTypeExist
      ? await interfaceTypeRepository.update(
          { ...store.api, fields: [] },
          { id: store.api.id },
        )
      : await interfaceTypeRepository.add([{ ...store.api, fields: [] }])

    store.api.fields.forEach(async (field) => {
      const fieldExist = await fieldRepository.findOne({ id: field.id })
      fieldExist
        ? await fieldRepository.update(field, { id: field.id })
        : await fieldRepository.add([field])
    })

    await storeRepository
      .add([store])
      .catch(() => storeRepository.update(store, { id: store.id }))
  }

  const pagesData = app.pages.map(({ elements, ...props }) => ({
    ...props,
    app: { id: app.id },
  }))

  console.log('Creating new app...')

  await appRepository.add([{ ...app, owner, pages: [] }])
  await pageRepository.add(pagesData)

  console.log('Creating actions...')

  // await importActions(app.store.actions, app.store.id)

  return app
}

export const createComponents = async (
  components: Array<IComponentExport>,
  owner: IAuth0Owner,
) => {
  const fieldRepository = new FieldRepository()
  const propRepository = new PropRepository()
  const storeRepository = new StoreRepository()
  const interfaceTypeRepository = new InterfaceTypeRepository()

  for (const component of components) {
    const isExist = findComponent({ id: component.id })

    if ((await isExist).length > 0) {
      return
    } else {
      await interfaceTypeRepository.add([
        { ...component.store.api, fields: [] },
        { ...component.api, fields: [] },
      ])

      await fieldRepository.add(component.api.fields)
      await fieldRepository.add(component.store.api.fields)
      await storeRepository.add([component.store])
      await propRepository.add([component.props])
      await createComponent(component, owner)
    }
  }
}
/**
 * Gather all pages, elements and components
 */

export const getApp = async (app: App): Promise<ExportAppData> => {
  const pageRepository = new PageRepository()
  const pages = await pageRepository.find({ app: { id: app.id } })

  const pagesData = await Promise.all(
    pages.map(async (page) => {
      const { elements } = await getPageData(page)

      const { id, kind, name, pageContentContainer, rootElement, store, url } =
        page

      return {
        elements,
        id: id,
        kind: kind,
        name: name,
        rootElement: {
          id: rootElement.id,
          name: rootElement.name,
        },
        store,
        url,
        ...(pageContentContainer ? { pageContentContainer } : {}),
      }
    }),
  )

  return {
    app: {
      ...app,
      pages: pagesData,
    },
  }
}

// export component of the app

export const getAppComponents = async (
  app: App,
): Promise<IExportComponents> => {
  const pageRepository = new PageRepository()
  const pages = await pageRepository.find({ app: { id: app.id } })

  const componentPromises = map(pages, async (page) => {
    const { components } = await getPageData(page)

    return components
  })

  const components = await Promise.all(componentPromises).then((result) =>
    flatMap(result),
  )

  return { components }
}
