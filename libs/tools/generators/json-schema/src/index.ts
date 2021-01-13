import * as path from 'path'
import * as glob from 'glob'
import {
  getOutputFile,
  getSymbolDirectory,
  makeGenerator,
  saveSchema,
} from './generator'
import { lintFiles } from './utils'

/**
 * We look in each use case folder for a `[UseCase]Input.ts` file, then we generate a json schema alongside that file named `[UseCase]Input.generated.ts`
 */

const tsconfigFile = path.resolve(process.cwd(), 'tsconfig.base.json')

const includeFilePatterns = glob.sync('libs/modules/**/useCases/**/*Input.ts', {
  cwd: process.cwd(),
})

const generator = makeGenerator(tsconfigFile, includeFilePatterns)

let savedFiles: Array<string> = []

console.log(includeFilePatterns, generator.getUserSymbols())

for (const symbol of generator.getUserSymbols()) {
  const schema = generator.getSchemaForSymbol(symbol)

  const symbolBasePath = getSymbolDirectory(symbol, includeFilePatterns)

  const outputFile = getOutputFile(symbolBasePath, symbol)

  const savedFile = saveSchema(schema, outputFile, symbol)

  savedFiles = [...savedFiles, savedFile]
}

lintFiles(savedFiles)
