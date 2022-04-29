/**
 * https://github.com/axios/axios/issues/1754
 * @jest-environment node
 */
import { UserOGM } from '@codelab/backend'
import { client } from '@codelab/frontend/model/infra/graphql'
import { upsertUser } from '@codelab/frontend/modules/user'
import { IAtom, ICreateAtomDTO } from '@codelab/shared/abstract/core'
import { createAtomsData } from '@codelab/shared/data'
import { reduce } from 'lodash'
import { setup } from '../setup/setup'

const appName = 'Codelab!!'
const pageName = 'Home'

describe('App', () => {
  const data = setup()

  it('should create an app a page', async () => {
    const { rootStore, auth0Service } = data
    const { appService, pageService } = rootStore
    const auth0 = await auth0Service

    client.setHeader('authorization', `Bearer ${auth0.access_token}`)

    /**
     * Need to call promise here
     */
    await upsertUser(await UserOGM(), {
      email: auth0.email,
      sub: auth0.auth0_user_id,
    })

    const [app] = await appService.create([
      {
        name: appName,
        auth0Id: auth0.auth0_user_id,
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

  it('should create atoms', async () => {
    const { rootStore, auth0Service } = data
    const { atomService } = rootStore
    const auth0 = await auth0Service

    client.setHeader('authorization', `Bearer ${auth0.access_token}`)

    const atoms = await reduce<
      Omit<ICreateAtomDTO, 'owner'>,
      Promise<Array<IAtom>>
    >(
      createAtomsData,
      async (results, atom) => {
        const [createdAtom] = await atomService.create([
          {
            ...atom,
            owner: auth0.auth0_user_id,
          },
        ])

        return [...(await results), createdAtom]
      },
      Promise.resolve([]),
    )

    // console.log('atoms', atoms)

    // const atoms = await atomService.getAll()

    expect(atoms).toEqual(
      expect.arrayContaining(
        createAtomsData.map((atom) =>
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
    const { rootStore, auth0Service } = data
    const { adminService } = rootStore
    const auth0 = await auth0Service

    client.setHeader('authorization', `Bearer ${auth0.access_token}`)

    const exportedStringData = await adminService.exportData()
    const exportedData = JSON.parse(exportedStringData)

    // cLog(exportedData)

    /**
     * https://www.emgoto.com/jest-partial-match/
     */
    expect(exportedData).toMatchObject({
      // Use arrayContaining so order doesn't matter
      atoms: expect.arrayContaining(
        createAtomsData.map((atom) =>
          expect.objectContaining({
            name: atom.name,
            type: atom.type,
            // This is required for nested
            api: expect.objectContaining({
              name: `${atom.name} API`,
            }),
          }),
        ),
      ),
    })
  })
})
