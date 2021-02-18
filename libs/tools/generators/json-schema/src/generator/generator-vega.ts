import * as path from 'path'
import glob from 'glob'
import * as tsj from 'ts-json-schema-generator'
import { Config } from 'ts-json-schema-generator'
import { createSchemaExport } from '../utils/create-export'
import { ExportData } from '../utils/utils'

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

export const npmLibraryTypesOutputFile = `${process.cwd()}/libs/generated/src/jsonSchema-npmLibrary.generated.ts`

/**
 * Vega is used to generate JSON schema from external NPM library interfaces or types.
 *
 * Not as flexible but saves us time from having to re-declare types
 */
export const npmLibraryJsonSchema = (symbols?: Array<string>): ExportData => {
  const generator = tsj.createGenerator(config)

  const schema = generator.createSchema()

  return {
    content: [createSchemaExport(schema, 'Vega')],
    imports: [
      {
        source: 'json-schema',
        entities: ['JSONSchema7'],
      },
      {
        source: '@codelab/tools/generators/json-schema',
        entities: ['DecoratorsMap'],
      },
    ],
  }
}
