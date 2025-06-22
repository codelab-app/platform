import ts from 'typescript'

/**
 * Parse import paths from TypeScript/JavaScript source code using AST
 */
export const parseImports = (
  content: string,
  filePath: string,
): Array<string> => {
  const imports: Array<string> = []

  // Create a source file from the content
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
  )

  // Visit all nodes in the AST
  const visit = (node: ts.Node) => {
    // Handle ES6 imports: import ... from 'path'
    if (ts.isImportDeclaration(node)) {
      if (ts.isStringLiteral(node.moduleSpecifier)) {
        imports.push(node.moduleSpecifier.text)
      }
    }

    // Handle ES6 exports: export ... from 'path'
    if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
      if (ts.isStringLiteral(node.moduleSpecifier)) {
        imports.push(node.moduleSpecifier.text)
      }
    }

    // Handle require calls: require('path')
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'require' &&
      node.arguments.length > 0
    ) {
      const arg = node.arguments[0]

      if (arg && ts.isStringLiteral(arg)) {
        imports.push(arg.text)
      }
    }

    // Handle dynamic imports: import('path')
    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length > 0
    ) {
      const arg = node.arguments[0]

      if (arg && ts.isStringLiteral(arg)) {
        imports.push(arg.text)
      }
    }

    // Continue visiting child nodes
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  // Return unique imports
  return [...new Set(imports)]
}
