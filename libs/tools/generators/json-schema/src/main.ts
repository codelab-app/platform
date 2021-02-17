import path from 'path'
import { tsedInputFiles, tsedJsonSchemaCb } from './tsed/generator-tsed'
import {
  appendImports,
  lintFiles,
  mapFilesWithSymbolPattern,
  saveToFile,
} from './utils'
import { vegaJsonSchemaCb } from './vega/generator-vega'

const file = path.resolve(
  process.cwd(),
  'libs/tools/generators/json-schema/src/types/css.ts',
)

const outputFile = `${process.cwd()}/libs/generated/src/jsonSchema.generated.ts`

// only generate these once
const externalTypesOutputFile = `${process.cwd()}/libs/generated/src/jsonSchema-external.generated.ts`

const main = async () => {
  const tsedJsonSchemaContents = await mapFilesWithSymbolPattern(
    tsedInputFiles,
    [/Props/, /Input/],
    tsedJsonSchemaCb,
  )

  saveToFile(outputFile)(appendImports([tsedJsonSchemaContents]))
  lintFiles([outputFile])

  saveToFile(externalTypesOutputFile)(appendImports([vegaJsonSchemaCb()]))
  lintFiles([externalTypesOutputFile])
}

main()
