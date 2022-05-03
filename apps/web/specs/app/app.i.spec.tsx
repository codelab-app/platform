/**
 * https://github.com/axios/axios/issues/1754
 * @jest-environment node
 */
import { UserOGM } from '@codelab/backend'
import { upsertUser } from '@codelab/frontend/modules/user'
import { IAtom, ICreateAtomDTO, ITypeKind } from '@codelab/shared/abstract/core'
import {
  booleanTypeId,
  buttonInterfaceId,
  createAtomsData,
  createPrimitiveTypesData,
  floatTypeId,
  integerTypeId,
  stringTypeId,
} from '@codelab/shared/data'
import { reduce } from 'lodash'
import { v4 } from 'uuid'
import { setup } from '../setup/setup'

const appName = 'Codelab'
const pageName = 'Home'

describe('App', () => {
  const data = setup()

  it('should create an app a page', async () => {
    const { rootStore, auth0Service } = data
    const { appService, pageService, userService } = rootStore
    const auth0 = await auth0Service

    /**
     * Need to call promise here
     */
    await upsertUser(await UserOGM(), {
      email: auth0.email,
      sub: auth0.auth0Id,
    })

    const [app] = await appService.create([
      {
        name: appName,
        auth0Id: auth0.auth0Id,
      },
    ])

    expect(app).toMatchObject({
      name: appName,
    })

    const [page] = await pageService.create([
      {
        name: 'Home',
        appId: app.id,
      },
    ])

    expect(page).toMatchObject({
      name: pageName,
    })
  })

  it('should create types', async () => {
    const { rootStore, auth0Service } = data
    const { atomService, typeService } = rootStore
    const auth0 = await auth0Service

    const input = createPrimitiveTypesData([
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
      createAtomsData([buttonInterfaceId]),
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

    // cLog(atoms)

    // const atoms = await atomService.getAll()

    expect(atoms).toEqual(
      expect.arrayContaining(
        createAtomsData([]).map((atom) =>
          // We want all those
          expect.objectContaining({
            name: atom.name,
            type: atom.type,
          }),
        ),
      ),
    )
  })

  it('should export atoms data', async () => {
    const { rootStore } = data
    const { adminService } = rootStore
    const exportedStringData = await adminService.exportData()
    const exportedData = JSON.parse(exportedStringData)

    // cLog(exportedData)

    /**
     * https://www.emgoto.com/jest-partial-match/
     */
    expect(exportedData).toMatchObject({
      // Use arrayContaining so order doesn't matter
      atoms: expect.arrayContaining(
        createAtomsData([]).map((atom) =>
          expect.objectContaining({
            name: atom.name,
            type: atom.type,
            // This is required for nested
            api: expect.objectContaining({
              name: `${atom.name} API`,
              fields: [],
            }),
          }),
        ),
      ),
    })
  })
})
