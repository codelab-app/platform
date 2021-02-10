import { getJsonSchema } from '@tsed/schema'
import P from 'bluebird'
import glob from 'glob'
import { createSchemaExport, lintFiles, saveToFile } from './utils'

export const inputFiles = [
  ...glob.sync('libs/alpha/ui/antd/src/**/*.input.ts', {
    cwd: process.cwd(),
  }),
  ...glob.sync('libs/modules/**/useCases/**/*Input.ts', {
    cwd: process.cwd(),
  }),
]

const outputFile = `${process.cwd()}/libs/generated/src/jsonSchema.generated.ts`

const main = async () => {
  const jsonSchemaContents = await P.reduce(
    inputFiles,
    async (multipleFileExports, file) => {
      const module = await import(file)

      const exportedSymbols = Object.keys(module).filter(
        (name) =>
          // Get only types with *Props or *Input in the export name
          /Props/.test(name) || /Input/.test(name),
      )

      console.log(`Exporing symbols "${exportedSymbols.join(' ')}"...`)

      // Reduce to a single string
      const fileExports = exportedSymbols.reduce((combinedExports, symbol) => {
        const jsonSchema = getJsonSchema(module[symbol])
        const jsonSchemaExport =
          JSON.stringify(jsonSchema) === `{"type":"object"}`
            ? ''
            : createSchemaExport(jsonSchema, symbol)

        return `${combinedExports} \n ${jsonSchemaExport}`
      }, '')

      return `${multipleFileExports} \n ${fileExports}`
    },
    `import { JSONSchema7 } from 'json-schema'\n`,
  )

  saveToFile(outputFile)(jsonSchemaContents)

  lintFiles([outputFile])
}

main()
