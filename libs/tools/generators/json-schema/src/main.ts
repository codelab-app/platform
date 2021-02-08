import { getJsonSchema } from '@tsed/schema'
import P from 'bluebird'
import { jsonSchemaGenerator } from './generator/generator-config'
import { getFormProps } from './generator/generator-form'
import {
  createSchemaExport,
  getPathFromSymbol,
  lintFiles,
  saveToFile,
} from './utils'

const generateExportContent = async (): Promise<string> => {
  return await P.reduce(
    jsonSchemaGenerator.getUserSymbols(),
    async (content, symbol) => {
      const sourceFilePath = getPathFromSymbol(symbol)

      console.log('\n---')
      console.log(`Analyzing symbol: "${symbol}"...`)
      console.log('---')

      /**
       * Generate schema using `@tsed/schema`
       */
      console.log('Generating json schema using "@tsed/schema"... ')

      const module = await import(sourceFilePath ?? '')
      const tsedSchema =
        module[symbol] &&
        // Make sure @tsed/schema decorators are used, without it, it defaults to type object
        JSON.stringify(getJsonSchema(module[symbol])) !== `{"type":"object"}`
          ? getJsonSchema(module[symbol])
          : undefined

      /**
       * Generate schema using `typescript-json-schema`
       */
      console.log('Generating json schema using "typescript-json-schema"... ')

      const schema = jsonSchemaGenerator.getSchemaForSymbol(symbol)
      // Revert to old schema export unless tsed exists
      const schemaExport = tsedSchema
        ? createSchemaExport(tsedSchema, symbol)
        : createSchemaExport(schema, symbol)

      /**
       * Generate form template props
       */
      console.log('Generating form props... ')

      const formPropsExport = await getFormProps(sourceFilePath, symbol)

      return `${content} \n\n ${schemaExport} \n\n ${formPropsExport}`
    },
    '',
  )
}

const formatContentForExport = (content: string): string => {
  const importsList = [
    `import { JSONSchema7 } from 'json-schema'`,
    `import { ObjectFieldTemplateFactory, DecoratorsMap } from '@codelab/tools/generators/json-schema'`,
  ]

  return `${importsList.join('\n\n')} \n\n ${content}`
}

generateExportContent()
  .then(formatContentForExport)
  .then(
    saveToFile(`${process.cwd()}/libs/generated/src/json-schema.generated.ts`),
  )
  .then((outputPath: string) => {
    lintFiles([outputPath])
    console.log(`Saving generated schema to... ${outputPath}`)
  })
  .catch((err) => console.log(err))
