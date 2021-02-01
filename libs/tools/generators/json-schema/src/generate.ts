import * as fs from 'fs'
import * as path from 'path'
import * as glob from 'glob'
import * as ts from 'typescript'
import { SymbolRef } from 'typescript-json-schema'
import { getFormProps } from './formPropsGenerator'
import { createSchemaExport, makeGenerator } from './jsonSchemaGenerator'
import { lintFiles } from './utils'

// const tsconfigFile = path.resolve(process.cwd(), 'tsconfig.base.json')
const tsconfigFile = path.resolve(
  process.cwd(),
  'libs/tools/generators/json-schema/tsconfig.lib.json',
)

const includeFilePatterns = [
  // PropsInput
  ...glob.sync('libs/alpha/ui/antd/**/components/**/*.input.ts', {
    cwd: process.cwd(),
  }),

  // UseCaseInputs
  ...glob.sync('libs/modules/**/useCases/**/*Input.ts', {
    cwd: process.cwd(),
  }),
]

const jsonSchemaGenerator = makeGenerator(tsconfigFile, includeFilePatterns)

const getSourceFileFromTSNode = (tsNode: ts.Node): string => {
  if (tsNode !== undefined && tsNode.parent !== undefined) {
    return getSourceFileFromTSNode(tsNode.parent)
  }

  if (tsNode.kind === ts.SyntaxKind.SourceFile) {
    return (tsNode as ts.SourceFile).fileName
  }

  console.log(`Error: Couldn't find SourceFile`)

  return ''
}
const getSourceFileFromSymbolRefs = (
  symbolRefs: Array<SymbolRef>,
): Array<string> =>
  symbolRefs.map((sRef) => getSourceFileFromTSNode(sRef.symbol.declarations[0]))

const generateContentList = (): Array<Promise<[string, string]>> => {
  return jsonSchemaGenerator.getUserSymbols().map((symbol) => {
    const schema = jsonSchemaGenerator.getSchemaForSymbol(symbol)
    const schemaExport = createSchemaExport(schema, symbol)

    const sourceFilePath = getSourceFileFromSymbolRefs(
      jsonSchemaGenerator.getSymbols(symbol),
    ).find((filePath) => includeFilePatterns.includes(filePath))
    const formPropsExport =
      sourceFilePath === undefined ? '' : getFormProps(sourceFilePath, symbol)

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

const saveToFile = (outputPath: string) => (content: string) => {
  fs.writeFileSync(outputPath, content)

  return outputPath
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
