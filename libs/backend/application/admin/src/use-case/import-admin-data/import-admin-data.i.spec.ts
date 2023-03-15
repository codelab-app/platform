import { AdminService } from '@codelab/backend/domain/admin'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { setupNewUser } from '@codelab/backend/shared/util'
import type { IUserDTO } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import path from 'path'
import { ImportAdminDataService } from './import-admin-data.service'

const atomRepository = new AtomRepository()
let user: IUserDTO

jest.setTimeout(60000)

beforeAll(async () => {
  user = await setupNewUser({
    AdminService,
    User,
    UserRepository,
  })
})

afterAll(async () => {
  const driver = getDriver()
  await driver.close()
})

describe('Import data', () => {
  it('can import admin data', async () => {
    await new ImportAdminDataService(
      path.resolve('./data/export-test'),
    ).execute(user)

    const atoms = await atomRepository.find()

    expect(atoms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: IAtomType.AntDesignAffix,
        }),
        expect.objectContaining({
          name: IAtomType.AntDesignAlert,
        }),
        expect.objectContaining({
          name: IAtomType.AntDesignAnchor,
        }),
      ]),
    )
  })
})
