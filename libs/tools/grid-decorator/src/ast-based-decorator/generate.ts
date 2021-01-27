import * as path from 'path'
import * as glob from 'glob'
import { programFromConfig } from 'typescript-json-schema'
import {
  getOutputFile,
  getSymbolDirectory,
  lintFiles,
  writeFile,
} from '../utils'
import { buildGenerator } from './buildGenerator'

const tsconfigFile = path.resolve(process.cwd(), 'tsconfig.base.json')

const includeFilePatterns = glob.sync('libs/modules/**/useCases/**/*Input.ts', {
  cwd: process.cwd(),
})

const program = programFromConfig(tsconfigFile, includeFilePatterns)

const generator = buildGenerator(program, includeFilePatterns, ['grid'])

if (!generator) {
  throw new Error('missing generator')
}

let savedFiles: Array<string> = []

for (const symbol of generator.getUserSymbols()) {
  const decoratorDetails = generator.getMapBySymbol(symbol)

  if (Object.entries(decoratorDetails).length > 0) {
    const symbolBasePath = getSymbolDirectory(symbol, includeFilePatterns)

    const outputFile = getOutputFile(symbolBasePath, symbol)

    const savedFile = writeFile(decoratorDetails, outputFile, symbol)

    savedFiles = [...savedFiles, savedFile]
  }
}

lintFiles(savedFiles)
