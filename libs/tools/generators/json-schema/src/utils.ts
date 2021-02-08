import fs from 'fs'
import * as shell from 'shelljs'
import * as ts from 'typescript'
import * as TJS from 'typescript-json-schema'

export const lintFiles = (files: Array<string>) => {
  // const cmd = `eslint ${files.join(' ')} --fix`
  const cmd = `npx prettier ${files.join(' ')} --write`

  console.log(cmd)

  return shell.exec(cmd, { async: true })
  // spawn(cmd, {
  //   stdio: 'inherit',
  //   shell: true,
  // })
}

export const getSourceFileFromTSNode = (tsNode: ts.Node): string => {
  if (tsNode !== undefined && tsNode.parent !== undefined) {
    return getSourceFileFromTSNode(tsNode.parent)
  }

  if (tsNode.kind === ts.SyntaxKind.SourceFile) {
    return (tsNode as ts.SourceFile).fileName
  }

  console.log(`Error: Couldn't find SourceFile`)

  return ''
}

export const getPathFromSymbol = (
  symbol: string,
  generator: TJS.JsonSchemaGenerator,
  includeFilePatterns: Array<string>,
): string | undefined =>
  generator
    .getSymbols(symbol)
    .map((sRef: any) => getSourceFileFromTSNode(sRef.symbol.declarations[0]))
    .find((filePath: string) => includeFilePatterns.includes(filePath))

export const saveToFile = (outputPath: string) => (content: string) => {
  fs.writeFileSync(outputPath, content)

  return outputPath
}

export const createSchemaExport = (schema: string, symbol: string): string => {
  const fileContents = `export const ${symbol}Schema: JSONSchema6 = ${JSON.stringify(
    schema,
    null,
    2,
  )}`

  return fileContents
}

export const formatContentForExport = (content: string): string => {
  const importsList = [
    `import { JSONSchema6 } from 'json-schema'`,
    `import { ObjectFieldTemplateFactory, DecoratorsMap } from '@codelab/tools/generators/json-schema'`,
  ]

  return `${importsList.join('\n\n')} \n\n ${content}`
}
