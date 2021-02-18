import { generateExportData } from './generator/generator-symbols'
import { tsedInputFiles, tsedJsonSchemaCb } from './generator/generator-tsed'
import {
  npmLibraryJsonSchema,
  npmLibraryTypesOutputFile,
} from './generator/generator-vega'
import { generateStringFromExportData } from './utils/export-from-data'
import { lintFiles, saveToFile } from './utils/utils'

const tsedOutputFile = `${process.cwd()}/libs/generated/src/jsonSchema-tsed.generated.ts`

const main = async () => {
  const tsedJsonSchemaContents = await generateExportData(
    tsedInputFiles,
    [/Props/, /Input/],
    tsedJsonSchemaCb,
    {
      header: ['/* eslint-disable import/order, sort-imports */'],
      content: [],
      imports: [
        {
          source: '@codelab/tools/generators/json-schema',
          entities: ['DecoratorsMap'],
        },
        {
          source: 'json-schema',
          entities: ['JSONSchema7'],
        },
      ],
    },
  )

  /**
   * We save to separate file since these are generated less often
   *
   * After switching to Prettier instead of ESLint, we save about 4x - 5x the time, so we could considering exporting to single file.
   *
   * This way we can keep the promise then function style for piping content to the file
   */

  saveToFile(npmLibraryTypesOutputFile)(
    generateStringFromExportData(npmLibraryJsonSchema()),
  )
  lintFiles([npmLibraryTypesOutputFile])

  saveToFile(tsedOutputFile)(
    generateStringFromExportData(tsedJsonSchemaContents),
  )
  lintFiles([tsedOutputFile])
}

main()
