import { getJsonSchema } from '@tsed/schema'
import glob from 'glob'
import { SymbolMap, SymbolMapCb, createSchemaExport } from '../utils'

export const tsedInputFiles = [
  ...glob.sync('libs/alpha/ui/antd/src/**/*.input.ts', {
    cwd: process.cwd(),
  }),
  ...glob.sync('libs/modules/**/useCases/**/*Input.ts', {
    cwd: process.cwd(),
  }),
]

export const tsedJsonSchemaCb: SymbolMapCb = ([symbol, module]: SymbolMap) => {
  const jsonSchema = getJsonSchema(module[symbol])

  return JSON.stringify(jsonSchema) === `{"type":"object"}`
    ? ''
    : createSchemaExport(jsonSchema, symbol)
}
