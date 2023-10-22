import { TagApplicationModule } from '@codelab/backend/application/tag'
import { AdminRepository } from '@codelab/backend/domain/admin'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { SeederDomainService } from '@codelab/backend/domain/shared/seeder'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { Auth0Module } from '@codelab/backend/infra/adapter/auth0'
import { IRole } from '@codelab/shared/abstract/core'
import { Module } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import fs from 'fs'
import glob from 'glob'
import path from 'path'
import { AdminController } from '../../admin.application.controller'
import { AdminApplicationModule } from '../../admin.application.module'

@Module({})
class Auth0ModuleMock {}

const currentUser = {
  auth0Id: '982650bc-fb74-4ca4-b2f2-3c1ee12e1e0b',
  email: 'admin@codelab.app',
  id: '0147b1b3-03b2-469a-b94e-c7fe3239edda',
  roles: [IRole.Admin],
  username: 'Codelab',
}

jest.setTimeout(200000)

const exportPath = path.resolve('./data/export-v3')
const exportTestPath = path.resolve('./tmp/data/export-v3')
let adminController: AdminController

describe('Seed, import, & export data', () => {
  beforeAll(async () => {
    fs.rmSync(exportTestPath, { force: true, recursive: true })

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SharedDomainModule,
        UserDomainModule,
        AdminApplicationModule,
        TagApplicationModule,
      ],
      providers: [AdminRepository, SeederDomainService, Auth0ModuleMock],
    })
      .overrideProvider(AuthDomainService)
      .useValue({ currentUser })
      .overrideModule(Auth0Module)
      .useModule(Auth0ModuleMock)
      .compile()

    await module.init()

    adminController = module.get<AdminController>(AdminController)

    const adminRepository = module.get<AdminRepository>(AdminRepository)
    const seederService = module.get<SeederDomainService>(SeederDomainService)

    await adminRepository.resetDatabase(false)
    await seederService.seedUserFromRequest()
  })

  it('should import and export Ant Design data without changes', async () => {
    await adminController.import({ adminDataPath: exportPath })
    await adminController.export({ adminDataPath: exportTestPath })

    const sourceToExpectedFilePath = glob
      .sync('**/*', { cwd: exportTestPath, nodir: true })
      .reduce((acc, file) => {
        const sourcePath = path.resolve(exportPath, file)
        const exportedPath = path.resolve(exportTestPath, file)

        return acc.set(sourcePath, exportedPath)
      }, new Map())

    for (const [sourceFile, exportedFile] of sourceToExpectedFilePath) {
      const sourceContent = fs.readFileSync(sourceFile, 'utf8')
      const exportedContent = fs.readFileSync(exportedFile, 'utf8')

      expect(exportedContent).toEqual(sourceContent)
    }
  })
})
