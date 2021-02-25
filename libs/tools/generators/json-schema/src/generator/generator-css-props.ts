import * as path from 'path'
import glob from 'glob'
import { JSONSchema7 } from 'json-schema'
import * as TJS from 'typescript-json-schema'
import { createSchemaExport } from '../utils/create-export'
import { ExportData } from '../utils/utils'
import { CssPropsSchemaConverter } from './CssPropsSchemaConverter'

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

export const vegaInputFiles = [
  ...glob.sync('libs/tools/generators/json-schema/src/types/*.ts', {
    cwd: process.cwd(),
  }),
]

const tsconfigFile = path.resolve(
  process.cwd(),
  'libs/tools/generators/json-schema/tsconfig.vega.lib.json',
)

export const npmLibraryTypesOutputFile = `${process.cwd()}/libs/generated/src/jsonSchema-npmLibrary.generated.ts`

/**
 * Vega is used to generate JSON schema from external NPM library interfaces or types.
 *
 * Not as flexible but saves us time from having to re-declare types
 */
export const npmLibraryJsonSchema = (symbols?: Array<string>): ExportData => {
  const generator = makeGenerator(tsconfigFile, vegaInputFiles)

  const schema = generator.getSchemaForSymbols(['CSSProperties'], true)

  const schemaConverter = new CssPropsSchemaConverter()
  const convertedSchema = schemaConverter.processSchema(schema)

  return {
    header: ['/* eslint-disable import/order, sort-imports, no-unused-vars */'],
    content: [createSchemaExport(convertedSchema as JSONSchema7, 'Vega')],
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
