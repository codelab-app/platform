import { AtomApplicationModule } from '@codelab/backend/application/atom'
import { ComponentApplicationModule } from '@codelab/backend/application/component'
import {
  MigrationDataService,
  ReadAdminDataService,
  SharedApplicationModule,
} from '@codelab/backend/application/shared'
import { TagApplicationModule } from '@codelab/backend/application/tag'
import { SeederDomainService } from '@codelab/backend/domain/shared/seeder'
import { initUserContext } from '@codelab/backend/test'
import { CommandBus } from '@nestjs/cqrs'
import fs from 'fs'
import glob from 'glob'
import path from 'path'
import { AdminController } from '../../admin.application.controller'
import { AdminApplicationModule } from '../../admin.application.module'
import {
  ExportAdminDataCommand,
  ExportAdminDataHandler,
} from '../export/export-admin-data.command.service'
import {
  ImportAdminDataCommand,
  ImportAdminDataHandler,
} from '../import/import-admin-data.command.service'
import { SeederApplicationService } from '../seed-data'

jest.setTimeout(200000)

const exportPath = path.resolve('./data/export-v3')
const exportTestPath = path.resolve('./tmp/data/export-v3')

describe('Seed, import, & export data', () => {
  const context = initUserContext({
    imports: [AdminApplicationModule],
  })

  let commandBus: CommandBus

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    fs.rmSync(exportTestPath, { force: true, recursive: true })

    commandBus = module.get(CommandBus)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should import and export Ant Design data without changes', async () => {
    await commandBus.execute(new ImportAdminDataCommand(exportPath))
    await commandBus.execute(new ExportAdminDataCommand(exportTestPath))

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
