import * as ts from 'typescript'

export const tsNodeFactory = (program: ts.Program, file: string) => {
  const sourceFile = program.getSourceFile(file)

  if (!sourceFile) {
    throw new Error('source file not found')
  }

  const symbols: Array<string> = []

  ts.forEachChild(sourceFile, (node) => {
    let name = ''

    // This is an incomplete set of AST nodes which could have a top level identifier
    // it's left to you to expand this list, which you can do by using
    // https://ts-ast-viewer.com/ to see the AST of a file then use the same patterns
    // as below
    if (ts.isFunctionDeclaration(node)) {
      name = node?.name?.text ?? ''
    } else if (ts.isVariableStatement(node)) {
      name = node.declarationList.declarations[0].name.getText(sourceFile)
    } else if (ts.isInterfaceDeclaration(node)) {
      name = node.name.text
    } else if (ts.isTypeAliasDeclaration(node)) {
      name = node.name.text

      console.log(`${name} isTypeAliasDeclaration`)

      symbols.push(name)
    }
  })

  return symbols
}
