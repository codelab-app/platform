import { unlink, createWriteStream, writeFile, existsSync, mkdirSync } from 'fs'
import { join, resolve } from 'path'
import { getAntdPropsNames } from './generate-props-names'
import * as TJS from 'typescript-json-schema'

// NOTE: to run script you can use:
// `yarn generate-antd-json-schema`

const outputRoot = resolve(
  `./libs/alpha/ui/component/src/form/graph/json-schemas/`,
)

if (!existsSync(outputRoot)) {
  mkdirSync(outputRoot)
}

const settings: TJS.PartialArgs = {
  required: true,
  ref: false,
  ignoreErrors: true,
}

const compilerOptions = {
  skipLibCheck: true,
}

const program = TJS.getProgramFromFiles(
  [resolve('./libs/alpha/ui/antd/src/components/index.ts')],
  compilerOptions,
)
const generator = TJS.buildGenerator(program, settings)
const allSymbols = generator.getUserSymbols()

const schemasFilePath = join(outputRoot, `schemas.ts`)

// clear schemas file
unlink(schemasFilePath, (err) => {
  if (err) throw err
  console.log(`${schemasFilePath} was deleted`)
})
writeFile(schemasFilePath, '', (err) => {
  if (err) {
    console.log(err)
  }
})

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
