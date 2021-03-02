import { getJsonSchema } from '@tsed/schema'
import glob from 'glob'
import { createSchemaExport } from '../utils/create-export'
import { SymbolMap, SymbolMapCb } from '../utils/utils'
import { getFormProps } from './generator-json--form'

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
  const jsonSchema = getJsonSchema(module[symbol], { customKeys: true })

  const content =
    JSON.stringify(jsonSchema) === `{"type":"object"}`
      ? ''
      : createSchemaExport(jsonSchema, symbol)

  const exportData = getFormProps(symbol, module[symbol], file)

  exportData.content = [...exportData.content, content]

  return exportData
}
