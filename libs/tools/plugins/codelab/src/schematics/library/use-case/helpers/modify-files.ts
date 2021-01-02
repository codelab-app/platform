import { Rule, Tree } from '@angular-devkit/schematics'
import { getTsSourceFile } from '@nrwl/angular/src/utils/ast-utils'
import { InsertChange, addMethod, insert } from '@nrwl/workspace'
import { Change, getSourceNodes } from '@nrwl/workspace/src/utils/ast-utils'
import * as ts from 'typescript'
import { NormalizedSchema } from '../schematic'

const getArrayContentsPosition = (
  sourceFile: ts.SourceFile,
  providersName: string,
): number => {
  let position = 0
  const nodes: Array<ts.Node> = getSourceNodes(sourceFile)

  nodes.forEach((node: ts.Node) => {
    node.forEachChild((childNode: ts.Node) => {
      if (childNode.kind === ts.SyntaxKind.VariableDeclaration) {
        const nodeName = (childNode as any).name.escapedText

        if (nodeName === providersName) {
          childNode.forEachChild((arrayNode: ts.Node) => {
            if (arrayNode.kind === ts.SyntaxKind.ArrayLiteralExpression) {
              const children = arrayNode.getChildren()

              children.forEach((child: ts.Node) => {
                if (child.kind === ts.SyntaxKind.SyntaxList) {
                  position = child.pos
                }
              })
            }
          })
        }
      }
    })
  })

  return position
}

const addToProvidersArray = (
  sourceFile: ts.SourceFile,
  modulePath: string,
  providersName: string,
  stringToAdd: string,
): Array<Change> => {
  const resultChanges: Array<Change> = []
  const position = getArrayContentsPosition(sourceFile, providersName)
  const insertChange = new InsertChange(modulePath, position, stringToAdd)

  resultChanges.push(insertChange)

  return resultChanges
}

const addToClass = (
  sourceFile: ts.SourceFile,
  modulePath: string,
  stringToAdd: string,
): Array<Change> => {
  const resultChanges: Array<Change> = []
  const nodes: Array<ts.Node> = getSourceNodes(sourceFile)

  nodes.forEach((node: ts.Node) => {
    node.forEachChild((childNode: ts.Node) => {
      if (childNode.kind === ts.SyntaxKind.ClassDeclaration) {
        const classContents = childNode.getChildAt(4)
        const insertChange = new InsertChange(
          modulePath,
          classContents.pos,
          stringToAdd,
        )

        resultChanges.push(insertChange)
      }
    })
  })

  return resultChanges
}

const insertIntoModule = (host: Tree, options: NormalizedSchema): void => {
  const { useCaseName, moduleNamePascalCase, moduleName, handlerType } = options
  const moduleFilePath = `${options.projectRoot}/src/framework/nestjs/${moduleNamePascalCase}Module.ts`
  const moduleSrcFile: ts.SourceFile = getTsSourceFile(host, moduleFilePath)

  const useCaseProvidersChanges: Array<Change> = addToProvidersArray(
    moduleSrcFile,
    moduleFilePath,
    'useCaseProviders',
    `\n  {
    provide: ${moduleNamePascalCase}DITokens.${useCaseName}UseCase,
    useFactory: (${moduleName}Repository) => new ${useCaseName}Service(${moduleName}Repository),
    inject: [${moduleNamePascalCase}DITokens.${moduleNamePascalCase}Repository],
  },`,
  )
  const handlerProvidersChanges: Array<Change> = addToProvidersArray(
    moduleSrcFile,
    moduleFilePath,
    'handlerProviders',
    `\n  ${useCaseName}${handlerType},`,
  )

  insert(host, moduleFilePath, [
    ...useCaseProvidersChanges,
    ...handlerProvidersChanges,
  ])
}

const insertIntoCommandQueryAdapter = (
  host: Tree,
  options: NormalizedSchema,
): void => {
  const {
    projectRoot,
    resolverType,
    useCaseName,
    resolverMethodName,
    moduleNamePascalCase,
  } = options
  const commandQueryAdapterClassName = `${moduleNamePascalCase}CommandQueryAdapter`
  const commandQueryAdapterFilePath = `${projectRoot}/src/presentation/controllers/${commandQueryAdapterClassName}.ts`
  const commandQuerySourceFile: ts.SourceFile = getTsSourceFile(
    host,
    commandQueryAdapterFilePath,
  )
  const busType = resolverType === 'Mutation' ? 'commandBus' : 'queryBus'
  const commandOrQuery = resolverType === 'Mutation' ? 'Command' : 'Query'

  insert(host, commandQueryAdapterFilePath, [
    ...addMethod(commandQuerySourceFile, commandQueryAdapterFilePath, {
      className: commandQueryAdapterClassName,
      methodHeader: `
              @${resolverType}((returns) => ${moduleNamePascalCase}UseCaseDto)\nasync ${resolverMethodName}(@Args('request') request: ${useCaseName}Request)`,
      body: `const result = await this.${busType}.execute(new ${useCaseName}${commandOrQuery}(request)) \nreturn result.toPlain()`,
    }),
  ])
}

const insertIntoDiTokens = (host: Tree, options: NormalizedSchema): void => {
  const { useCaseName, moduleNamePascalCase } = options
  const diTokensFilePath = `${options.projectRoot}/src/framework/${moduleNamePascalCase}DITokens.ts`
  const diTokensSrcFile: ts.SourceFile = getTsSourceFile(host, diTokensFilePath)

  const changes = addToClass(
    diTokensSrcFile,
    diTokensFilePath,
    `\n\n  public static readonly ${useCaseName}UseCase: unique symbol = Symbol(
    '${useCaseName}UseCase',
  )`,
  )

  insert(host, diTokensFilePath, [...changes])
}

export const modifyFiles = (options: NormalizedSchema): Rule => {
  return (host: Tree) => {
    insertIntoModule(host, options)
    insertIntoDiTokens(host, options)
    insertIntoCommandQueryAdapter(host, options)

    return host
  }
}
