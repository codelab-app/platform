import { jsonSchemaGenerator } from './generator-config'
import { getFormProps } from './generator-form'
import {
  createSchemaExport,
  getPathFromSymbol,
  lintFiles,
  saveToFile,
} from './utils'

const generateContentList = (): Array<Promise<[string, string]>> => {
  return jsonSchemaGenerator.getUserSymbols().map((symbol) => {
    console.log('\n---')
    console.log(`Analyzing symbol: "${symbol}"...`)
    console.log('---')
    console.log('Generating json schema... ')

    const schema = jsonSchemaGenerator.getSchemaForSymbol(symbol)
    const schemaExport = createSchemaExport(schema, symbol)

    const sourceFilePath = getPathFromSymbol(symbol)

    console.log('Generating form props... ')
    const formPropsExport = getFormProps(sourceFilePath, symbol)

    return Promise.all([schemaExport, formPropsExport])
  })
}

const prepareContentToPrint = (
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

Promise.all(generateContentList())
  .then(prepareContentToPrint)
  .then(
    saveToFile(`${process.cwd()}/libs/generated/src/json-schema.generated.ts`),
  )
  .then((outputPath: string) => {
    lintFiles([outputPath])
    console.log(`Saving generated schema to... ${outputPath}`)
  })
  .catch((err) => console.log(err))
