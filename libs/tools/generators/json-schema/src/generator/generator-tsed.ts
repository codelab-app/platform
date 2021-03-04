import { getJsonSchema } from '@tsed/schema'
import { createSchemaExport } from '../utils/create-export'
import { SymbolMap, SymbolMapCb } from '../utils/utils'
import { antdInput, useCaseInput } from './generator-inputFiles'
import { getFormProps } from './generator-json--form'

export const tsedInputFiles = [...antdInput, ...useCaseInput]

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
