import { tsedInputFiles, tsedJsonSchemaCb } from './tsed/generator-tsed'
import { mapFilesWithSymbolPattern } from './utils'

const outputFile = `${process.cwd()}/libs/generated/src/jsonSchema.generated.ts`

// only generate these once
const externalTypesOutputFile = `${process.cwd()}/libs/generated/src/jsonSchema-external.generated.ts`

const main = async () => {
  const tsedJsonSchemaContents = await mapFilesWithSymbolPattern(
    tsedInputFiles,
    [/Props/, /Input/],
    tsedJsonSchemaCb,
  )

  console.log('done')

  /**
   * We save to separate file since these are generated less often
   *
   * After switching to Prettier instead of ESLint, we save about 4x - 5x the time, so we could considering exporting to single file.
   *
   * This way we can keep the promise then function style for piping content to the file
   */

  // saveToFile(externalTypesOutputFile)(
  //   generateStringFromExportData(vegaJsonSchema()),
  // )
  // lintFiles([externalTypesOutputFile])

  // saveToFile(outputFile)(generateStringFromExportData(tsedJsonSchemaContents))
  // lintFiles([outputFile])
}

main()
