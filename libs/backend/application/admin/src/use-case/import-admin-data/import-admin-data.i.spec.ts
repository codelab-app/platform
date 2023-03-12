import type { IUser } from '@codelab/backend/abstract/core'
import { AdminService } from '@codelab/backend/domain/admin'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { setupUser } from '@codelab/backend/shared/util'
import { IAtomType } from '@codelab/shared/abstract/core'
import path from 'path'
import { ImportAdminDataService } from './import-admin-data.service'

const atomRepository = new AtomRepository()
let user: IUser

beforeAll(async () => {
  user = await setupUser({
    AdminService,
    UserRepository,
    User,
  })
})

afterAll(async () => {
  const driver = getDriver()
  await driver.close()
})

describe('Import data', () => {
  it('can import admin data', async () => {
    await new ImportAdminDataService(
      path.resolve('./libs/shared/data/seed/src/export'),
    ).execute(user)

    const atoms = await atomRepository.find()

    expect(atoms).toEqual(
      expect.arrayContaining([
        {
          name: IAtomType.AntDesignAffix,
        },
        {
          name: IAtomType.AntDesignAlert,
        },
        {
          name: IAtomType.AntDesignAnchor,
        },
      ]),
    )
  })
})
