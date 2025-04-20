import {
  BASE_DATA_PROD_PATH,
  getAtomsFromFiles,
} from '@codelab/backend/application/data'
import { CommandBusSubscription } from '@codelab/backend/infra/core'
import { deleteFilesSync } from '@codelab/backend/shared/util'
import { initUserContext } from '@codelab/backend/test/setup'
import { IAtomCategory, IAtomType } from '@codelab/shared/abstract/core'
import { isSubset } from '@codelab/shared/utils'
import { CommandBus } from '@nestjs/cqrs'
import { copy, ensureDir, readdirSync, readFileSync, rmSync } from 'fs-extra'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import gitChangedFiles from 'git-changed-files'
import { sync } from 'glob'
import path from 'path'

import { AdminApplicationModule } from '../../admin.application.module'
import { ExportAdminDataCommand } from '../export/export-admin-data.command.service'
import { ImportAdminDataCommand } from '../import/import-admin-data.command.service'

jest.setTimeout(400_000)

// We copy actual data to new path
const testDataPath = path.resolve('./tmp/data/import-v3')
const testExportDataPath = path.resolve('./tmp/data/export-v3')

describe('Seed, import, & export data', () => {
  const context = initUserContext({
    imports: [AdminApplicationModule],
    providers: [CommandBusSubscription],
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

    await copy(BASE_DATA_PROD_PATH, testDataPath)

    const atoms = getAtomsFromFiles({
      category: IAtomCategory.AntDesign,
      // overrides: [IAtomType.AntDesignButton],
    })

    deleteFilesSync(testDataPath, atoms)
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should check the atom files is a subset of the enum', () => {
    const files = readdirSync(
      path.resolve(BASE_DATA_PROD_PATH, 'admin/atoms'),
    ).map((file) => path.parse(file).name)

    const atoms = Object.values(IAtomType)
    const subset = isSubset(files, atoms)

    expect(subset).toBeTruthy()
  })

  it('should import and export Ant Design data without changes', async () => {
    await commandBus.execute(
      new ImportAdminDataCommand(testDataPath, { upsert: true }),
    )
    await commandBus.execute(new ExportAdminDataCommand(testExportDataPath))

    const sourceToExpectedFilePath = sync('**/*', {
      cwd: testExportDataPath,
      nodir: true,
    }).reduce((acc, file) => {
      const sourcePath = path.resolve(testDataPath, file)
      const exportedPath = path.resolve(testExportDataPath, file)

      return acc.set(sourcePath, exportedPath)
    }, new Map())

    for (const [sourceFile, exportedFile] of sourceToExpectedFilePath) {
      const sourceContent = readFileSync(sourceFile, 'utf8')
      const exportedContent = readFileSync(exportedFile, 'utf8')

      expect(exportedContent).toEqual(sourceContent)
    }

    // Also check no git diff is generated
    const { unCommittedFiles } = await gitChangedFiles()

    const containsGeneratedFiles = unCommittedFiles.reduce(
      (_matches: boolean, file: string) => {
        // Check if the file belongs to testDataPath
        const unCommittedPath = path.resolve(file)
        // console.log('absoluteFilePath', unCommittedPath)
        // console.log('baseDataPath', BASE_DATA_PATH)
        const isInTestDataPath = unCommittedPath.startsWith(BASE_DATA_PROD_PATH)

        return _matches || isInTestDataPath
      },
      false,
    )

    expect(containsGeneratedFiles).toBeFalsy()
  })
})
