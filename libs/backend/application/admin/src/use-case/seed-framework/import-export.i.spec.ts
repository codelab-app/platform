import { TagApplicationModule } from '@codelab/backend/application/tag'
import { AdminRepository } from '@codelab/backend/domain/admin'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { SharedDomainModule } from '@codelab/backend/domain/shared/modules'
import { SeederDomainService } from '@codelab/backend/domain/shared/seeder'
import { UserDomainModule } from '@codelab/backend/domain/user'
import { Auth0Module } from '@codelab/backend/infra/adapter/auth0'
import { Neo4jService } from '@codelab/backend/infra/adapter/neo4j'
import { initUserContext } from '@codelab/backend/test'
import { IRole } from '@codelab/shared/abstract/core'
import { Module } from '@nestjs/common'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import fs from 'fs'
import glob from 'glob'
import path from 'path'
import { AdminController } from '../../admin.application.controller'
import { AdminApplicationModule } from '../../admin.application.module'

jest.setTimeout(200000)

const exportPath = path.resolve('./data/export-v3')
const exportTestPath = path.resolve('./tmp/data/export-v3')
let adminController: AdminController

describe('Seed, import, & export data', () => {
  const context = initUserContext({
    imports: [AdminApplicationModule, TagApplicationModule],
    providers: [SeederDomainService],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    fs.rmSync(exportTestPath, { force: true, recursive: true })

    adminController = module.get<AdminController>(AdminController)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
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

      console.log(sourceContent)

      expect(exportedContent).toEqual(sourceContent)
    }
  })
})
