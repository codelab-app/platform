import { JSONSchema7 } from 'json-schema'

export const createSchemaExport = (
  schema: JSONSchema7,
  symbol: string,
): string => {
  const fileContents = `export const ${symbol}Schema: JSONSchema7 = ${JSON.stringify(
    schema,
    null,
    2,
  )}`

  return fileContents
}
