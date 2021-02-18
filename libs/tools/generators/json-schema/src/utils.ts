import fs from 'fs'
import P from 'bluebird'
import { JSONSchema7 } from 'json-schema'
import { merge } from 'lodash'
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

export const createSchemaExport = (
  schema: JSONSchema7,
  symbol: string,
): string => {
  const fileContents = `export const ${symbol}Schema: JSONSchema7 = ${JSON.stringify(
    schema,
    null,
    2,
  )}`

  return fileContents
}

export const appendImports = (content: Array<string>): string => {
  const importsList = [
    `import { JSONSchema7 } from 'json-schema'`,
    `import { ObjectFieldGridTemplateFactory, ObjectFieldTabsTemplate, DecoratorsMap } from '@codelab/tools/generators/json-schema'`,
  ]

  return content.reduce(
    (acc, cur) => `${acc} \n\n\n ${cur}`,
    `${importsList.join('\n')}`,
  )
}

// Take a list of files
// Filter out the symbols
// Pass export into function
// Reduce to single string

export type SymbolMap = {
  symbol: string
  module: any
  file: string
}

/**
 * We append each export accordingly
 */
export type ExportData = {
  content: Array<string>
  imports?: Array<ImportDetails>
}

export type SymbolMapCb = (filteredSymbols: SymbolMap) => ExportData

export const mapFilesWithSymbolPattern = (
  files: Array<string>,
  symbolPatterns: Array<RegExp>,
  cb: SymbolMapCb,
): Promise<ExportData> => {
  return P.reduce(
    files,
    async (_exportData, file) => {
      const module = await import(file)

      // Map each symbol to the module
      const moreExportData = Object.keys(module)
        .filter((name) =>
          // Get only types with *Props or *Input in the export name
          // /Props/.test(name) || /Input/.test(name),
          symbolPatterns.reduce<boolean>((acc, regExp) => {
            return acc || regExp.test(name)
          }, false),
        )
        .reduce<ExportData>((_moreExportData, symbol: string) => {
          return merge(_moreExportData, cb({ symbol, module, file }))
        }, _exportData)

      return merge(_exportData, moreExportData)
    },
    {
      content: [],
      imports: [
        {
          entities: ['DecoratorsMap'],
          source: '@codelab/tools/generators/json-schema',
        },
      ],
    } as ExportData,
  )
}

export type ImportDetails = {
  source: string
  entities: Array<string>
}

export const generateImports = (
  importsDetails: Array<ImportDetails>,
): string => {
  return importsDetails
    .reduce((acc, curr) => {
      const existed = acc.find(
        (accDetails) => accDetails.source === curr.source,
      )

      if (existed) {
        existed.entities = [...new Set([...existed.entities, ...curr.entities])]

        return acc
      }

      return [...acc, { ...curr, entities: [...new Set([...curr.entities])] }]
    }, [] as Array<ImportDetails>)
    .map(
      (details) =>
        `import { ${details.entities.join(', ')} } from '${details.source}'`,
    )
    .join('\n')
}

export const convertFileToModule = (filePath: string): string =>
  filePath.replace(/.tsx?$/, '')

export const generateStringFromExportData = ({
  content,
  imports = [],
}: ExportData) => {
  return `${generateImports(imports)} \n\n ${content.join('\n')}`
}
