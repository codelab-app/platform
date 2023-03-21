import { AdminService } from '@codelab/backend/domain/admin'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { setupNewUser } from '@codelab/backend/shared/util'
import type { IUserDTO } from '@codelab/frontend/abstract/core'
import path from 'path'
import { exportAndAssert, importData, seedData } from './seed-data-spec.helper'

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

describe('Seed, import, & export data', () => {
  let initialPayload = {}

  it('can seed Ant Design CSV data', async () => {
    await seedData(user)

    const exportPath = path.resolve('./tmp/data/export')
    const payload = await exportAndAssert(exportPath)

    initialPayload = payload
  })

  it('should be able to seed twice without changing the database', async () => {
    await seedData(user)

    const exportPath = path.resolve('./tmp/data/export-1')
    const payload = await exportAndAssert(exportPath)

    expect(payload).toEqual(initialPayload)
  })

  const importPath = path.resolve('./tmp/data/export')

  /**
   * Importing from file should result in the same data as seed
   */
  it('should import Ant Design data', async () => {
    user = await setupNewUser({
      AdminService,
      User,
      UserRepository,
    })

    const exportPath = path.resolve('./tmp/data/export-2')
    await importData(user, importPath)

    const payload = await exportAndAssert(exportPath)

    expect(payload).toEqual(initialPayload)
  })

  it('should import data twice without changing the database', async () => {
    await importData(user, importPath)

    const exportPath = path.resolve('./tmp/data/export-3')
    const payload = await exportAndAssert(exportPath)

    expect(payload).toEqual(initialPayload)
  })
})
