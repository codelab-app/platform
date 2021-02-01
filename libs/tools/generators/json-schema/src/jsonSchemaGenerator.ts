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

export const createSchemaExport = (
  schema: TJS.Definition,
  symbol: string,
): string => {
  const fileContents = `export const ${symbol}Schema: JSONSchema7 = ${JSON.stringify(
    schema,
    null,
    2,
  )}`

  return fileContents
}
