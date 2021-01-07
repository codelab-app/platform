import * as fs from 'fs'
import * as path from 'path'
import * as TJS from 'typescript-json-schema'

export const makeGenerator = (
  tsconfigFile: string,
  includeFilePatterns: Array<string>,
): TJS.JsonSchemaGenerator => {
  const program = TJS.programFromConfig(tsconfigFile, includeFilePatterns)

  const settings: TJS.PartialArgs = {
    ref: false,
    strictNullChecks: true,
  }

  const generator = TJS.buildGenerator(program, settings, includeFilePatterns)

  if (!generator) {
    throw new Error('missing generator')
  }

  return generator
}

export const saveSchema = (
  schema: TJS.Definition,
  outputPath: string,
  symbol: string,
): string => {
  const fileContents = `export const ${symbol}Schema = ${JSON.stringify(
    schema,
    null,
    2,
  )}`

  console.log(`Saving "${symbol}" to "${outputPath}"...`)

  fs.writeFileSync(outputPath, fileContents)

  return outputPath
}

export const getSymbolDirectory = (
  symbol: string,
  includeFilePatterns: Array<string>,
) => {
  const includeFilePattern = includeFilePatterns.find((pattern) => {
    return pattern.includes(symbol)
  })

  if (!includeFilePattern) {
    throw new Error('symbol directory not found')
  }

  return path.dirname(includeFilePattern)
}

export const getOutputFile = (baseDirectory: string, symbol: string) => {
  return path.resolve(baseDirectory, `${symbol}.generated.ts`)
}
