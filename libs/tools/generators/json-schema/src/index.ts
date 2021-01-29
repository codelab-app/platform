import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'
import { createSchemaExport, makeGenerator } from './generator'
import { lintFiles } from './utils'

const outputPath = `${process.cwd()}/libs/generated/src/json-schema.generated.ts`
/**
 * We look in each use case folder for a `[UseCase]Input.ts` file, then we generate a json schema alongside that file named `[UseCase]Input.generated.ts`
 */
const tsconfigFile = path.resolve(process.cwd(), 'tsconfig.base.json')

const includeFilePatterns = glob.sync('libs/modules/**/useCases/**/*Input.ts', {
  cwd: process.cwd(),
})

const generator = makeGenerator(tsconfigFile, includeFilePatterns)

const finalFileContents = generator
  .getUserSymbols()
  .reduce((fileContents, symbol) => {
    const schema = generator.getSchemaForSymbol(symbol)
    const schemaExport = createSchemaExport(schema, symbol)

    // use getSymbolDirectory to get filepath

    return `${fileContents} \n\n ${schemaExport}`
  }, `import { JSONSchema7 } from 'json-schema' \n\n`)

// console.log(outputPath)
// console.log(finalFileContents)

fs.writeFileSync(outputPath, finalFileContents)

console.log(`Saving generated schema to... ${outputPath}`)

lintFiles([outputPath])

// const savedFiles: Array<string> = []
// Output per folder
// for (const symbol of generator.getUserSymbols()) {
//   const schema = generator.getSchemaForSymbol(symbol)

//   const symbolBasePath = getSymbolDirectory(symbol, includeFilePatterns)

//   const outputFile = getOutputFile(symbolBasePath, symbol)

//   const savedFile = saveSchema(schema, outputFile, symbol)

//   savedFiles = [...savedFiles, savedFile]
// }
