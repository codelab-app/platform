import { IAtomType } from '@codelab/shared/abstract/core'
import fs from 'fs'
import path, { resolve } from 'path'
import * as TJS from 'typescript-json-schema'

/**
 * This parser isn't as flexible https://github.com/YousefED/typescript-json-schema/issues/376#issuecomment-1110211982
 *
 * opt for another solution
 */

// optionally pass argument to schema generator
const settings: TJS.PartialArgs = {
  required: true,
}

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
}

/**
 * We generate from a file that exports multiple html
 */
interface GeneratedSchema {
  definitions: {
    [html: string]: unknown
  }
}

export const parseHtmlTjs = () => {
  const program = TJS.getProgramFromFiles(
    [resolve('apps/cli/src/use-cases/parse/html.interface.ts')],
    compilerOptions,
    // Base path
    // './apps/cli',
  )

  // We can either get the schema for one file and one type...
  const schema = TJS.generateSchema(program, '*', settings)

  if (!schema?.definitions) {
    throw new Error('Missing schema')
  }

  Object.entries(schema.definitions).forEach(([key, value]) => {
    if ([IAtomType.HtmlA].includes(key as IAtomType)) {
      const outputPath = path.resolve(`data/html/${key}.json`)
      const data = JSON.stringify(value, null, 2)

      fs.writeFile(outputPath, data, (err) => {
        if (err) {
          throw err
        }
      })
    }
  })

  // const schemaString = JSON.stringify(schema, null, 2)

  // ... or a generator that lets us incrementally get more schemas
  // const generator = TJS.buildGenerator(program, settings)
  //
  // if (!generator) {
  //   throw new Error('Missing generator')
  // }
  //
  // // generator can be also reused to speed up generating the schema if usecase allows:
  // const schemaWithReusedGenerator = TJS.generateSchema(
  //   program,
  //   'MyType',
  //   settings,
  //   [],
  //   generator,
  // )
  //
  // // all symbols
  // const symbols = generator.getUserSymbols()
  //
  // // Get symbols for different types from generator.
  // generator.getSchemaForSymbol('MyType')
  // generator.getSchemaForSymbol('AnotherType')
}
