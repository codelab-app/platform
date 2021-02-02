import path from 'path'
import * as glob from 'glob'
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

export const tsconfigFile = path.resolve(
  process.cwd(),
  'libs/tools/generators/json-schema/tsconfig.lib.json',
)

export const includeFilePatterns = [
  // PropsInput
  ...glob.sync('libs/alpha/ui/antd/**/components/**/*.input.ts', {
    cwd: process.cwd(),
  }),

  // UseCaseInputs
  ...glob.sync('libs/modules/**/useCases/**/*Input.ts', {
    cwd: process.cwd(),
  }),
]

export const jsonSchemaGenerator = makeGenerator(
  tsconfigFile,
  includeFilePatterns,
)
