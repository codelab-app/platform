import { AdminService } from '@codelab/backend/domain/admin'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { execCommand } from '@codelab/backend/infra/adapter/shell'
import { resetDatabase } from '@codelab/backend/test'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import fs from 'fs'
import path from 'path'
import type { ImportAdminDataService } from '../import-admin-data'
import { concatenateFileContents } from './compare-directories'
import { exportAndAssert } from './seed-framework-spec'

let user: IUserDTO

jest.setTimeout(60000)

const driver = getDriver()
const exportPath = path.resolve('./data/export')
const exportTestPath = path.resolve('./tmp', exportPath)

beforeAll(() => {
  fs.rmSync(exportTestPath, { force: true, recursive: true })
})

afterAll(async () => {
  await driver.close()
})

describe.skip('Seed, import, & export data', () => {
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
      // const module: TestingModule = await Test.createTestingModule({
      //   imports: [
      //     ConfigModule.forRoot({
      //       envFilePath: '.env.test',
      //       ignoreEnvVars: true,
      //       isGlobal: true,
      //       load: [neo4jConfig],
      //     }),
      //   ],
      //   providers: [
      //     {
      //       provide: 'DATA_PATH',
      //       useValue: importPath,
      //     },
      //     ImportAdminDataService,
      //   ],
      // }).compile()

      // importAdminDataService = module.get<ImportAdminDataService>(
      //   ImportAdminDataService,
      // )
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
     * TODO: works when we run command in cli, but fails here, test with CLI instead for now
     */
    it.skip('should import Ant Design data', async () => {
      await importAdminDataService.execute(user)

      initialPayload = await exportAndAssert(exportPath)
    })

    it('should import Ant Design data with cli commands', () => {
      /**
       * Import here from default data directory
       */
      execCommand(
        `yarn cli import --stage test --skipSeedData false --skipUserData --email ${user.email}`,
      )

      /**
       * Export to tmp folder
       */
      execCommand(
        `yarn cli export --stage test --skipSeedData false --skipUserData --seedDataPath ${exportTestPath}`,
      )

      /**
       * Compare 2 directory structure
       */
      const exportPathContents = concatenateFileContents(exportPath)
      const exportTestPathContents = concatenateFileContents(exportTestPath)

      expect(exportPathContents).toEqual(exportTestPathContents)
    })

    it.skip('should import data twice without changing the database', async () => {
      await importAdminDataService.execute(user)

      const payload = await exportAndAssert(exportPath)

      expect(payload).toEqual(initialPayload)
    })
  })
})
