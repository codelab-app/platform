import * as path from 'path'
import glob from 'glob'
import * as tsj from 'ts-json-schema-generator'
import { Config } from 'ts-json-schema-generator'
import { createSchemaExport } from '../utils'

export const vegaInputFiles = [
  ...glob.sync('libs/tools/generators/json-schema/src/types/*.ts', {
    cwd: process.cwd(),
  }),
]

const config: Config = {
  expose: 'none',
  topRef: false,
  encodeRefs: false,
  // path: path.resolve(
  //   process.cwd(),
  //   'libs/tools/generators/json-schema/src/types/**/*.ts',
  // ),
  tsconfig: path.resolve(
    process.cwd(),
    'libs/tools/generators/json-schema/tsconfig.vega.lib.json',
  ),
  // type: '*',
}

export const vegaJsonSchemaCb = (symbols?: Array<string>) => {
  const generator = tsj.createGenerator(config)

  const schema = generator.createSchema()

  return createSchemaExport(schema, 'Vega')
}
