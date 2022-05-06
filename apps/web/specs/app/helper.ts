import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import { AdminExportPayload } from '@codelab/shared/abstract/core'
import { createAtomsData, createSeedTypesData } from '@codelab/shared/data'
import fs from 'fs'
import path from 'path'
import { SetupData } from '../setup/setup'

export let exportedData: AdminExportPayload

export const checkExportedData = async (data: SetupData) => {
  const { rootStore } = data
  const { adminService } = rootStore
  const exportedStringData = await adminService.exportData()
  exportedData = JSON.parse(exportedStringData)

  const dataPath = path.resolve(__dirname, 'export-data.json')

  fs.writeFileSync(dataPath, exportedStringData)

  // cLog(exportedData.apps)

  /**
   * https://www.emgoto.com/jest-partial-match/
   */
  expect(exportedData).toMatchObject({
    // Use arrayContaining so order doesn't matter
    atoms: expect.arrayContaining(
      createAtomsData().map((atom) =>
        expect.objectContaining({
          name: atom.name,
          type: atom.type,
          // This is required for nested
          api: expect.objectContaining({
            id: expect.any(String),
            // name: `${atom.name} API`,
            // fields: [],
          }),
        }),
      ),
    ),
    types: expect.arrayContaining(
      createSeedTypesData().map((primitiveType) =>
        expect.objectContaining({
          kind: primitiveType.kind,
          name: primitiveType.name,
          primitiveKind: (primitiveType as any).primitiveKind,
        }),
      ),
    ),
    apps: expect.arrayContaining([
      expect.objectContaining({
        name: 'Codelab',
        pages: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: 'Home',
            elements: expect.arrayContaining([
              expect.objectContaining({
                name: 'Button',
              }),
              expect.objectContaining({
                name: ROOT_ELEMENT_NAME,
              }),
            ]),
          }),
        ]),
      }),
    ]),
  })
}
