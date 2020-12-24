import { createWriteStream } from 'fs'
import * as TJS from 'typescript-json-schema'
import { getAntdPropsNames } from './generate-props-names'

export const generateJsonSchemas = (
  generator: TJS.JsonSchemaGenerator | null,
  schemasFilePath: string,
): void => {
  if (generator === null) {
    console.log(
      `generateJsonSchemas ERROR: something goes wrong. Generator is null`,
    )

    return
  }

  const allSymbols = generator.getUserSymbols()

  const stream = createWriteStream(schemasFilePath, { flags: 'a' })

  getAntdPropsNames().forEach((typeName) => {
    if (!allSymbols.includes(typeName)) {
      return
    }

    console.log('JSON-schema generated for: ', typeName)
    const propsSchema = generator.getSchemaForSymbol(typeName)
    const exportedTypeName = typeName.replace('.AntdProps', '')

    // writeFile(
    //   join(outputRoot, `${exportedTypeName}.schemas.ts`),
    //   `export const ${exportedTypeName} = ${JSON.stringify(
    //     propsSchema,
    //     null,
    //     2,
    //   )}`,
    //   (err) => {
    //     if (err) {
    //       console.log(err)
    //     }
    //   },
    // )
    stream.write(
      `export const ${exportedTypeName} = ${JSON.stringify(
        propsSchema,
        null,
        2,
      )}\n\n`,
    )
  })

  stream.end()
}

export const buildGenerator = (
  root: string,
): TJS.JsonSchemaGenerator | null => {
  const settings: TJS.PartialArgs = {
    required: true,
    ref: false,
    ignoreErrors: true,
  }

  const compilerOptions = {
    skipLibCheck: true,
  }

  const program = TJS.getProgramFromFiles([root], compilerOptions)

  return TJS.buildGenerator(program, settings)
}
