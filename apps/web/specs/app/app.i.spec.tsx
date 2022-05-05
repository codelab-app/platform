/**
 * https://github.com/axios/axios/issues/1754
 * @jest-environment node
 */
import { UserOGM } from '@codelab/backend'
import { createRootStore } from '@codelab/frontend/model/infra/mobx'
import { upsertUser } from '@codelab/frontend/modules/user'
import { IAtom, ICreateAtomDTO, ITypeKind } from '@codelab/shared/abstract/core'
import {
  appData,
  booleanTypeId,
  buttonAtomId,
  buttonElementData,
  buttonInterfaceId,
  createAtomsData,
  createSeedTypesData,
  floatTypeId,
  integerTypeId,
  pageData,
  stringTypeId,
} from '@codelab/shared/data'
import { reduce } from 'lodash'
import { registerRootStore, unregisterRootStore } from 'mobx-keystone'
import { v4 } from 'uuid'
import { setup } from '../setup/setup'
import { checkExportedData, exportedData } from './helper'

describe('App', () => {
  const data = setup()

  beforeAll(() => {
    const { auth0Service } = data

    return auth0Service.then((auth0) =>
      UserOGM().then((User) =>
        upsertUser(User, {
          email: auth0.email,
          sub: auth0.auth0Id,
        }),
      ),
    )
  })

  it('should create types', async () => {
    const { rootStore, auth0Service } = data
    const { atomService, typeService } = rootStore
    const auth0 = await auth0Service

    const input = createSeedTypesData([
      stringTypeId,
      booleanTypeId,
      floatTypeId,
      integerTypeId,
    ]).map((primitiveType) => ({
      ...primitiveType,
      auth0Id: auth0.auth0Id,
    }))

    const types = await typeService.create(input)
    /**
     * Create button api for assignment later
     */

    await typeService.create([
      {
        id: buttonInterfaceId,
        name: 'AntDesignButton API',
        kind: ITypeKind.InterfaceType,
        auth0Id: auth0.auth0Id,
      },
    ])

    /**
     * Create size enum
     */

    const sizeEnumId = v4()

    await typeService.create([
      {
        id: sizeEnumId,
        name: 'Size',
        kind: ITypeKind.EnumType,
        allowedValues: [
          {
            id: v4(),
            name: 'small',
            value: 'small',
          },
          {
            id: v4(),
            name: 'middle',
            value: 'middle',
          },
          {
            id: v4(),
            name: 'large',
            value: 'large',
          },
        ],
        auth0Id: auth0.auth0Id,
      },
    ])

    /**
     * Add fields
     */
    await typeService.addField(buttonInterfaceId, {
      id: v4(),
      key: 'block',
      fieldType: buttonInterfaceId,
    })

    await typeService.addField(buttonInterfaceId, {
      id: v4(),
      key: 'size',
      fieldType: sizeEnumId,
    })
  })

  it('should create atoms', async () => {
    const { rootStore, auth0Service } = data
    const { atomService } = rootStore
    const auth0 = await auth0Service

    const atoms = await reduce<
      Omit<ICreateAtomDTO, 'owner'>,
      Promise<Array<IAtom>>
    >(
      createAtomsData([buttonAtomId], [buttonInterfaceId]),
      async (results, atom) => {
        const [createdAtom] = await atomService.create([
          {
            ...atom,
            owner: auth0.auth0Id,
          },
        ])

        return [...(await results), createdAtom]
      },
      Promise.resolve([]),
    )

    expect(atoms).toEqual(
      expect.arrayContaining(
        createAtomsData().map((atom) =>
          // We want all those
          expect.objectContaining({
            name: atom.name,
            type: atom.type,
          }),
        ),
      ),
    )
  })

  it('should create an app a page', async () => {
    const { rootStore, auth0Service } = data
    const { appService, pageService, elementService } = rootStore
    const auth0 = await auth0Service

    const [app] = await appService.create([
      {
        id: appData.id,
        name: appData.name,
        auth0Id: auth0.auth0Id,
      },
    ])

    expect(app).toMatchObject({
      id: appData.id,
      name: appData.name,
    })

    const [page] = await pageService.create([
      {
        id: pageData.id,
        name: 'Home',
        appId: app.id,
      },
    ])

    expect(page).toMatchObject({
      id: pageData.id,
      name: pageData.name,
    })

    await elementService.create([
      {
        id: buttonElementData.id,
        name: buttonElementData.name,
        atomId: buttonAtomId,
        parentElementId: page.rootElementId,
      },
    ])
  })

  it('should export data', async () => {
    await checkExportedData(data)
  })

  it('should import data', async () => {
    const { rootStore, auth0Service } = data
    const { adminService } = rootStore
    const auth0 = await auth0Service

    // Reset so we can import data
    await adminService.resetData()

    // Clear cached data
    unregisterRootStore(rootStore)

    const newRootStore = createRootStore({})
    registerRootStore(newRootStore)

    await upsertUser(await UserOGM(), {
      email: auth0.email,
      sub: auth0.auth0Id,
    })

    await adminService.importData(exportedData, auth0.auth0Id)

    await checkExportedData({
      rootStore: newRootStore,
      auth0Service,
    })
  })
})
