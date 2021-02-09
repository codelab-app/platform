import { getJsonSchema } from '@tsed/schema'
import P from 'bluebird'
import { createSchemaExport, getPathFromSymbol } from '../utils'
import { makeGenerator } from './generator-config'
import { getFormProps } from './generator-json--form'

export const generateJSONSchemaString = async (
  files: Array<string>,
): Promise<string> => {
  console.log(files)
  const generator = makeGenerator(files)

  console.log(generator.getUserSymbols())

  return await P.reduce(
    generator.getUserSymbols(),
    async (content, symbol) => {
      const sourceFilePath = getPathFromSymbol(symbol, generator, files)

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

      const schema = generator.getSchemaForSymbol(symbol)
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
