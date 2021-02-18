import fs from 'fs'
import { MergeWithCustomizer } from 'lodash'
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

// export const appendImports = (content: Array<string>): string => {
//   const importsList = [
//     `import { JSONSchema7 } from 'json-schema'`,
//     `import { ObjectFieldGridTemplateFactory, ObjectFieldTabsTemplate, DecoratorsMap } from '@codelab/tools/generators/json-schema'`,
//   ]

//   return content.reduce(
//     (acc, cur) => `${acc} \n\n\n ${cur}`,
//     `${importsList.join('\n')}`,
//   )
// }

// Take a list of files
// Filter out the symbols
// Pass export into function
// Reduce to single string

/**
 * @property module contains all symbols
 */
export type SymbolMap = {
  symbol: string
  module: any
  file: string
}

/**
 * We append each export accordingly
 */
export type ExportData = {
  // For ESLint comments
  header?: Array<string>
  // For ES6 imports
  imports: Array<ImportDetails>
  // Content
  content: Array<string>
}

export const exportDataDefault: ExportData = {
  content: [],
  imports: [],
}

export const exportDataMerger: MergeWithCustomizer = (
  value: any,
  srcValue: any,
  key: string,
  object: any,
  source: any,
  // eslint-disable-next-line consistent-return
): any => {
  // console.log(`Merging ${key}`, object, source)

  if (key === 'content') {
    return [...object.content, ...source.content]
  }

  if (key === 'imports') {
    return [...object.imports, ...source.imports]
  }

  if (key === 'header') {
    return [...object.header, source.header]
  }
}

export type SymbolMapCb = (filteredSymbols: SymbolMap) => ExportData

export type ImportDetails = {
  source: string
  entities: Array<string>
}

export const convertFileToModule = (filePath: string): string =>
  filePath.replace(/.tsx?$/, '')
