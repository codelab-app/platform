import { AdminService } from '@codelab/backend/domain/admin'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { resetDatabase } from '@codelab/backend/test'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import path from 'path'
import { AdminSeederService } from '../../services/admin-seeder.service'
import { ExportAdminDataService } from '../export-admin-data.service'
import { exportAndAssert, importData } from './seed-framework-spec'

let user: IUserDTO

jest.setTimeout(300000)

const driver = getDriver()

afterAll(async () => {
  await driver.close()
})

describe('Seed, import, & export data', () => {
  let initialPayload = {}

  describe.skip('Seed', () => {
    it('can seed Ant Design CSV data', async () => {
      user = await resetDatabase({
        AdminService,
        driver,
        User,
        UserRepository,
      })

      await new AdminSeederService(user).seedAntDesign()

      const exportPath = path.resolve('./tmp/data/export')

      const payload = (
        await new ExportAdminDataService(exportPath).execute()
      ).saveAsFiles()

      initialPayload = payload
    })

    it('should be able to seed twice without changing the database', async () => {
      await new AdminSeederService(user).seedAntDesign()

      const exportPath = path.resolve('./tmp/data/export-1')
      const payload = await exportAndAssert(exportPath)

      expect(payload).toEqual(initialPayload)
    })
  })

  describe.skip('Import', () => {
    const importPath = path.resolve('./tmp/data/export')

    /**
     * Importing from file should result in the same data as seed
     */
    it('should import Ant Design data', async () => {
      user = await resetDatabase({
        AdminService,
        driver,
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
})
