import { AdminService } from '@codelab/backend/domain/admin'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver, neo4jConfig } from '@codelab/backend/infra/adapter/neo4j'
import { resetDatabase } from '@codelab/backend/test'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import { withTracing } from '@codelab/shared/infra/otel'
import { ConfigModule } from '@nestjs/config'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import fs from 'fs'
import path from 'path'
import { AdminSeederService } from '../../services/admin-seeder.service'
import { ExportAdminDataService } from '../export-admin-data.service'
import { ImportAdminDataService } from '../import-admin-data'
import { exportAndAssert, importData } from './seed-framework-spec'

let user: IUserDTO

jest.setTimeout(60000)

const driver = getDriver()

beforeAll(() => {
  fs.rmSync(path.resolve('./tmp/data'), { force: true, recursive: true })
})

afterAll(async () => {
  await driver.close()
})

describe('Seed, import, & export data', () => {
  let initialPayload = {}

  // describe('Seed', () => {
  //   it('can seed Ant Design CSV data', async () => {
  //     user = await resetDatabase({
  //       AdminService,
  //       driver,
  //       User,
  //       UserRepository,
  //     })

  //     await new AdminSeederService(user).seedAntDesign()

  //     const exportPath = path.resolve('./tmp/data/export')
  //     const payload = await exportAndAssert(exportPath)

  //     initialPayload = payload
  //   })

  //   it('should be able to seed twice without changing the database', async () => {
  //     await new AdminSeederService(user).seedAntDesign()

  //     const exportPath = path.resolve('./tmp/data/export-1')
  //     const payload = await exportAndAssert(exportPath)

  //     expect(payload).toEqual(initialPayload)
  //   })
  // })

  describe('Import', () => {
    let importAdminDataService: ImportAdminDataService
    const importPath = path.resolve('./data/export')

    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            envFilePath: '.env.test',
            ignoreEnvVars: true,
            isGlobal: true,
            load: [neo4jConfig],
          }),
        ],
        providers: [
          {
            provide: 'DATA_PATH',
            useValue: importPath,
          },
          ImportAdminDataService,
        ],
      }).compile()

      importAdminDataService = module.get<ImportAdminDataService>(
        ImportAdminDataService,
      )
      user = await resetDatabase({
        AdminService,
        driver,
        User,
        UserRepository,
      })
    })

    /**
     * Importing from file should result in the same data as seed
     *
     * TODO: works when we run command in cli, but fails here
     */
    it.skip('should import Ant Design data', async () => {
      const exportPath = path.resolve('./tmp/data/export')

      await importAdminDataService.execute(user)

      initialPayload = await exportAndAssert(exportPath)
    })

    it.skip('should import data twice without changing the database', async () => {
      await importAdminDataService.execute(user)

      const exportPath = path.resolve('./tmp/data/export-1')
      const payload = await exportAndAssert(exportPath)

      expect(payload).toEqual(initialPayload)
    })
  })
})
