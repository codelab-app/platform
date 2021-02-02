import { jsonSchemaGenerator } from './generator/generator-config'
import { getFormProps } from './generator/generator-form'
import {
  createSchemaExport,
  getPathFromSymbol,
  lintFiles,
  saveToFile,
} from './utils'

const generateExportContent = (): Array<Promise<[string, string]>> => {
  return jsonSchemaGenerator.getUserSymbols().map((symbol) => {
    console.log('\n---')
    console.log(`Analyzing symbol: "${symbol}"...`)
    console.log('---')

    /**
     * Generate schema
     */
    console.log('Generating json schema... ')
    const schema = jsonSchemaGenerator.getSchemaForSymbol(symbol)
    const schemaExport = createSchemaExport(schema, symbol)

    /**
     * Generate form template props
     */
    console.log('Generating form props... ')
    const sourceFilePath = getPathFromSymbol(symbol)
    const formPropsExport = getFormProps(sourceFilePath, symbol)

    return Promise.all([schemaExport, formPropsExport])
  })
}

const formatContentForExport = (
  generatedContentList: Array<[string, string]>,
): string => {
  const content = generatedContentList
    .map(([schema, gridDetails]) => `${schema} \n\n ${gridDetails}`)
    .join('\n\n')

  const importsList = [
    `import { JSONSchema7 } from 'json-schema'`,
    `import { ObjectFieldTemplateFactory, IDecoratorsMap } from '@codelab/tools/generators/json-schema'`,
  ]

  return `${importsList.join('\n\n')} \n\n \n\n ${content}`
}

Promise.all(generateExportContent())
  .then(formatContentForExport)
  .then(
    saveToFile(`${process.cwd()}/libs/generated/src/json-schema.generated.ts`),
  )
  .then((outputPath: string) => {
    lintFiles([outputPath])
    console.log(`Saving generated schema to... ${outputPath}`)
  })
  .catch((err) => console.log(err))
