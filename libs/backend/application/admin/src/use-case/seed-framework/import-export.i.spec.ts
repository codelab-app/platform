import { execCommand } from '@codelab/backend/infra/adapter/shell'
import type { IUserDTO } from '@codelab/shared/abstract/core'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import fs from 'fs'
import path from 'path'
import { AdminApplicationModule } from '../../admin.application.module'
import { concatenateFileContents } from './compare-directories'

let user: IUserDTO

jest.setTimeout(60000)

const exportPath = path.resolve('./data/export')
const exportTestPath = path.resolve('./tmp/data/export')

beforeAll(() => {
  fs.rmSync(exportTestPath, { force: true, recursive: true })
})

describe.skip('Seed, import, & export data', () => {
  describe('Import', () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [AdminApplicationModule],
        providers: [],
      }).compile()
    })

    it('should import Ant Design data with cli commands', () => {
      /**
       * Import here from default data directory
       */
      execCommand(
        `yarn cli import --stage test --skipAdminData false --skipUserData --email ${user.email}`,
      )

      /**
       * Export to tmp folder
       */
      execCommand(
        `yarn cli export --stage test --skipAdminData false --skipUserData --adminDataPath ${exportTestPath}`,
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
