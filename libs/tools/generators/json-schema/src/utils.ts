import { spawn } from 'child_process'
import fs from 'fs'
import * as ts from 'typescript'
import * as TJS from 'typescript-json-schema'
import {
  includeFilePatterns,
  jsonSchemaGenerator,
} from './generator/generator-config'

export const lintFiles = (files: Array<string>) => {
  spawn(`npx eslint ${files.join(' ')} --fix`, {
    stdio: 'inherit',
    shell: true,
  })
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

export const getPathFromSymbol = (symbol: string): string | undefined =>
  jsonSchemaGenerator
    .getSymbols(symbol)
    .map((sRef) => getSourceFileFromTSNode(sRef.symbol.declarations[0]))
    .find((filePath) => includeFilePatterns.includes(filePath))

export const saveToFile = (outputPath: string) => (content: string) => {
  fs.writeFileSync(outputPath, content)

  return outputPath
}

export const createSchemaExport = (
  schema: TJS.Definition,
  symbol: string,
): string => {
  const fileContents = `export const ${symbol}Schema: JSONSchema7 = ${JSON.stringify(
    schema,
    null,
    2,
  )}`

  return fileContents
}
