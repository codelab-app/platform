import { AdminService } from '@codelab/backend/domain/admin'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { execCommand } from '@codelab/backend/infra/adapter/shell'
import { resetDatabase } from '@codelab/backend/test'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import fs from 'fs'
import path from 'path'
import { concatenateFileContents } from './compare-directories'

let user: IUserDTO

jest.setTimeout(60000)

const driver = getDriver()
const exportPath = path.resolve('./data/export')
const exportTestPath = path.resolve('./tmp/data/export')

beforeAll(() => {
  fs.rmSync(exportTestPath, { force: true, recursive: true })
})

afterAll(async () => {
  await driver.close()
})

describe('Seed, import, & export data', () => {
  describe('Import', () => {
    beforeAll(async () => {
      user = await resetDatabase({
        AdminService,
        driver,
        User,
        UserRepository,
      })
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
  })
})
