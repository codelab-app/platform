import { getJsonSchema } from '@tsed/schema'
import glob from 'glob'
import { getFormProps } from '../generator/generator-json--form'
import { SymbolMap, SymbolMapCb, createSchemaExport } from '../utils'

export const tsedInputFiles = [
  ...glob.sync('libs/alpha/ui/antd/src/**/*.input.ts', {
    cwd: process.cwd(),
  }),
  ...glob.sync('libs/modules/**/useCases/**/*Input.ts', {
    cwd: process.cwd(),
  }),
]

export const tsedJsonSchemaCb: SymbolMapCb = ({
  symbol,
  module,
  file,
}: SymbolMap) => {
  const jsonSchema = getJsonSchema(module[symbol])

  const content =
    JSON.stringify(jsonSchema) === `{"type":"object"}`
      ? ''
      : createSchemaExport(jsonSchema, symbol)

  const { content: formContent, imports } = getFormProps(
    symbol,
    module[symbol],
    file,
  )

  return { content: [content, formContent], imports }
}
