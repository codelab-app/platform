import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { getAppService } from '@codelab/frontend/modules/app'
import { getAtomService } from '@codelab/frontend/modules/atom'
import { getElementService } from '@codelab/frontend/modules/element'
import { getPageService } from '@codelab/frontend/modules/page'
import { getTypeService } from '@codelab/frontend/modules/type'
import {
  AdminExportPayload,
  IAdminService,
  IAtom,
  IElement,
  IPage,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { reduce } from 'lodash'
import {
  _async,
  _await,
  getSnapshot,
  Model,
  model,
  modelFlow,
  SnapshotOutOfObject,
  transaction,
} from 'mobx-keystone'
import { adminApi } from './admin.api'

@model('@codelab/AdminService')
export class AdminService extends Model({}) implements IAdminService {
  @modelFlow
  @transaction
  resetData = _async(function* (this: AdminService) {
    const { resetDatabase } = yield* _await(adminApi.ResetDatabase())

    return resetDatabase?.success
  })

  @modelFlow
  @transaction
  exportData = _async(function* (this: AdminService) {
    const typeService = getTypeService(this)
    const atomService = getAtomService(this)
    const appService = getAppService(this)
    const pageService = getPageService(this)
    const elementService = getElementService(this)

    // Get all types to hydrate the types first, so atom reference returns the full data
    const types = yield* _await(
      typeService.getAll({
        // id_IN: atoms.map((atom) => atom.api.id),
      }),
    )

    const atoms = yield* _await(atomService.getAll())
    const apps = yield* _await(appService.getAll())
    const pages = yield* _await(pageService.getAll())

    const getPageElements = async (page: IPage) => {
      const tree = await elementService.getTree(page.rootElementId)

      return tree.elements
    }

    const pageElementsMap = yield* _await(
      reduce<IPage, Promise<Map<string, any>>>(
        pages,
        async (results, page) => {
          const pageElements: any = [
            ...(await getPageElements(page)).values(),
          ].map((element) => getSnapshot(element))

          ;(await results).set(page.id, pageElements)

          return results
        },
        Promise.resolve(new Map()),
      ),
    )

    const payloadData: AdminExportPayload = {
      atoms: atoms.map((atom: IAtom) => ({
        ...getSnapshot(atom),
      })),
      types: types.map((type) => getSnapshot(type)),
      apps: apps.map((app) => ({
        ...getSnapshot(app),
        pages: app.pages.map((page) => ({
          ...getSnapshot(page.current),
          elements: pageElementsMap.get(page.current.id),
        })),
      })),
    }

    // console.log(payloadData.apps[0].pages[0].elements)

    return JSON.stringify(payloadData)
  })

  @modelFlow
  @transaction
  importData = _async(function* (
    this: AdminService,
    // should be the result of exportData or AtomImportService.exportAtoms
    exportData: AdminExportPayload,
    auth0Id: string,
  ) {
    // const atomImportService = getAtomImportServiceContext(this)
    const atomService = getAtomService(this)
    const typeService = getTypeService(this)
    const appService = getAppService(this)
    const pageService = getPageService(this)
    const elementService = getElementService(this)
    const { atoms, types, apps } = exportData

    /**
     * Sort so we add
     *
     * - PrimitiveTypes
     * - ArrayType
     * - AllowedValues
     * - InterfaceType (nested first)
     */
    const primitiveTypes = types
      .filter((type) => type.kind === ITypeKind.PrimitiveType)
      .map((type) => ({
        ...type,
        auth0Id,
      }))

    yield* _await(typeService.create(primitiveTypes))

    const arrayTypes = types
      .filter((type) => type.kind === ITypeKind.ArrayType)
      .map((type) => ({
        ...type,
        auth0Id,
      }))

    yield* _await(typeService.create(arrayTypes))

    const enumTypes = types
      .filter((type) => type.kind === ITypeKind.EnumType)
      .map((type) => ({
        ...type,
        auth0Id,
      }))

    yield* _await(typeService.create(enumTypes))

    const interfaceTypes = types
      .filter((type) => type.kind === ITypeKind.InterfaceType)
      .map((type) => ({
        ...type,
        auth0Id,
      }))

    /**
     * Need to create 1 at a time, issue with fieldConnections
     */
    yield* _await(
      reduce<any, any>(
        interfaceTypes,
        async (resultsPromise, interfaceType) => {
          const [type] = await typeService.create([interfaceType])
          const results = await resultsPromise

          return [...results, type]
        },
        [],
      ),
    )

    const atomsInput = atoms.map((atom) => ({
      ...atom,
      owner: auth0Id,
      api: atom.api.id,
      tags: [],
    }))

    yield* _await(atomService.create(atomsInput))

    /**
     * Import apps
     */
    const appsInput = apps.map((app) => ({
      ...app,
      auth0Id,
    }))

    yield* _await(appService.create(appsInput))

    /**
     * Add pages
     */
    const pagesInput = apps
      .map((app) =>
        app.pages.map((page) => ({
          name: page.name,
          appId: app.id,
          rootElementId: page.rootElementId,
        })),
      )
      .flat()

    yield* _await(pageService.create(pagesInput))

    /**
     * Add elements, except for root
     */
    const elementsInput = apps
      .map((app) =>
        app.pages.map((page) =>
          page.elements
            .filter((element) => element.name !== ROOT_ELEMENT_NAME)
            .map((element) => ({
              ...element,
              parentElementId: element?.parentId,
            })),
        ),
      )
      .flat()
      .flat()

    // yield* _await(elementService.create(elementsInput))

    yield* _await(
      reduce<SnapshotOutOfObject<IElement>, any>(
        elementsInput,
        async (resultsPromise, elementInput) => {
          const [element] = await elementService.create([elementInput])
          const results = await resultsPromise

          return [...results, element]
        },
        [],
      ),
    )
  })
}
