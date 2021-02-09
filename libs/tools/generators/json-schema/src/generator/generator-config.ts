/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */
import path from 'path'
import * as glob from 'glob'
import * as TJS from 'typescript-json-schema'

export const makeGenerator = (
  includeFilePatterns: Array<string>,
): TJS.JsonSchemaGenerator => {
  const tsconfigFile = path.resolve(
    process.cwd(),
    'libs/alpha/ui/antd/tsconfig.lib.json',
    // 'libs/tools/generators/json-schema/tsconfig.lib.json',
  )

  // const tsConfigJson = require(tsconfigFile)
  // console.log(tsConfigJson)

  const program = TJS.programFromConfig(tsconfigFile, includeFilePatterns)
  // const program = TJS.getProgramFromFiles(
  //   includeFilePatterns,
  //   tsConfigJson,
  //   path.resolve(process.cwd(), 'libs/alpha/ui/antd'),
  // )

  const settings: TJS.PartialArgs = {
    // required: true,
    ignoreErrors: false,
    tsNodeRegister: true,
    strictNullChecks: true,
    // ref: true,
  }

  const generator = TJS.buildGenerator(program, settings, includeFilePatterns)

  if (!generator) {
    throw new Error('missing generator')
  }

  return generator
}

export const antdPropsInput = glob.sync(
  'libs/alpha/ui/antd/src/components/**/*.input.ts',
  {
    cwd: process.cwd(),
  },
)

/**
 * A conditional props type
 */
export const propsInput = glob.sync(
  'libs/alpha/ui/antd/src/props/**/*.input.ts',
  {
    cwd: process.cwd(),
  },
)

export const useCaseInputs = glob.sync(
  'libs/modules/**/useCases/**/*Input.ts',
  {
    cwd: process.cwd(),
  },
)
