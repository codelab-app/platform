import { deleteFilesSync } from '@codelab/backend/shared/util'
import { initUserContext } from '@codelab/backend/test/setup'
import { IAtomType } from '@codelab/shared/abstract/core'
import { isSubset } from '@codelab/shared/utils'
import { CommandBus } from '@nestjs/cqrs'
import { copy, ensureDir, readdirSync, readFileSync, rmSync } from 'fs-extra'
import * as glob from 'glob'
import path from 'path'

import { AdminApplicationModule } from '../../admin.application.module'
import { ExportAdminDataCommand } from '../export/export-admin-data.command.service'
import { ImportAdminDataCommand } from '../import/import-admin-data.command.service'
import { getAtomsFromFiles, productionDataPath } from './utils'

jest.setTimeout(120000)

// We copy actual data to new path
const testDataPath = path.resolve('./tmp/data/import-v3')
const testExportDataPath = path.resolve('./tmp/data/export-v3')

describe('Seed, import, & export data', () => {
  const context = initUserContext({
    imports: [AdminApplicationModule],
  })

  let commandBus: CommandBus

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    rmSync(testExportDataPath, { force: true, recursive: true })
    rmSync(testDataPath, { force: true, recursive: true })

    await ctx.beforeAll()

    commandBus = module.get(CommandBus)

    /**
     * We copy actual data to new path
     */
    await ensureDir(testDataPath)
    await ensureDir(testExportDataPath)

    await copy(productionDataPath, testDataPath)

    const atoms = getAtomsFromFiles({
      // overrides: [IAtomType.ReactFragment],
    })

    deleteFilesSync(testDataPath, atoms)
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should check the atom files is a subset of the enum', () => {
    const files = readdirSync(
      path.resolve(productionDataPath, 'admin/atoms'),
    ).map((file) => path.parse(file).name)

    const atoms = Object.values(IAtomType)
    const subset = isSubset(files, atoms)

    expect(subset).toBeTruthy()
  })

  it('should import and export Ant Design data without changes', async () => {
    await commandBus.execute(new ImportAdminDataCommand(testDataPath))
    await commandBus.execute(new ExportAdminDataCommand(testExportDataPath))

    const sourceToExpectedFilePath = glob
      .sync('**/*', { cwd: testExportDataPath, nodir: true })
      .reduce((acc, file) => {
        const sourcePath = path.resolve(testDataPath, file)
        const exportedPath = path.resolve(testExportDataPath, file)

        return acc.set(sourcePath, exportedPath)
      }, new Map())

    for (const [sourceFile, exportedFile] of sourceToExpectedFilePath) {
      const sourceContent = readFileSync(sourceFile, 'utf8')
      const exportedContent = readFileSync(exportedFile, 'utf8')

      expect(exportedContent).toEqual(sourceContent)
    }
  })
})
