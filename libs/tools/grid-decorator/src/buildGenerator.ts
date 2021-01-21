import * as ts from 'typescript'
import { SymbolRef } from 'typescript-json-schema'
import { DecoratorMapGenerator, INodeTypes } from './DecoratorMapGenerator'

export const buildGenerator = (
  program: ts.Program,
  onlyIncludeFiles?: Array<string>,
  decorators?: Array<string>,
): DecoratorMapGenerator | null => {
  const isUserFile = (file: ts.SourceFile): boolean => {
    if (onlyIncludeFiles === undefined) {
      return !file.hasNoDefaultLib
    }

    return onlyIncludeFiles.indexOf(file.fileName) >= 0
  }

  const diagnostics: ReadonlyArray<ts.Diagnostic> = ts.getPreEmitDiagnostics(
    program,
  )

  if (diagnostics.length === 0) {
    const typeChecker = program.getTypeChecker()

    const userSymbols: Array<SymbolRef> = []
    const userNodeTypes: INodeTypes = {}

    program.getSourceFiles().forEach((sourceFile, _sourceFileIdx) => {
      const inspect = (node: ts.Node, tc: ts.TypeChecker) => {
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
          const { symbol } = <any>node
          const fullyQualifiedName = tc.getFullyQualifiedName(symbol)
          const typeName = fullyQualifiedName.replace(/".*"\./, '')
          const name = typeName
          const nodeType = tc.getTypeAtLocation(node)

          if (isUserFile(sourceFile)) {
            userSymbols.push({ name, typeName, fullyQualifiedName, symbol })
            userNodeTypes[name] = nodeType
          }
        } else {
          ts.forEachChild(node, (n) => inspect(n, tc))
        }
      }

      inspect(sourceFile, typeChecker)
    })

    return new DecoratorMapGenerator(userSymbols, userNodeTypes, decorators)
  }

  diagnostics.forEach((diagnostic) => {
    const message = ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      '\n',
    )

    console.error(message)
  })

  return null
}
