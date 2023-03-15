import { AdminService } from '@codelab/backend/domain/admin'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { FieldRepository } from '@codelab/backend/domain/type'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { setupNewUser } from '@codelab/backend/shared/util'
import type { IUserDTO } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import path from 'path'
import { ExportAdminDataService } from '../export-admin-data.service'
import { ImportAdminDataService } from '../import-admin-data/import-admin-data.service'
import { SeedDataService } from './seed-data.service'

let user: IUserDTO
const atomRepository = new AtomRepository()

jest.setTimeout(150000)

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

describe('Seed data', () => {
  it('can seed data', async () => {
    await new SeedDataService().execute(user)

    await new ExportAdminDataService(
      path.resolve('./data/export-test'),
    ).execute()

    user = await setupNewUser({
      AdminService,
      User,
      UserRepository,
    })

    await new ImportAdminDataService(
      path.resolve('./data/export-test'),
    ).execute(user)

    // const atoms = await atomRepository.find()

    // expect(atoms).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       name: IAtomType.AntDesignAffix,
    //     }),
    //     expect.objectContaining({
    //       name: IAtomType.AntDesignAlert,
    //     }),
    //     expect.objectContaining({
    //       name: IAtomType.AntDesignAnchor,
    //     }),
    //   ]),
    // )
  })
})
