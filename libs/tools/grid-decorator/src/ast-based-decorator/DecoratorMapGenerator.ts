import * as ts from 'typescript'
import { SymbolRef } from 'typescript-json-schema'

export interface IDecoratorMap {
  [propertyKey: string]: any
}

export interface INodeTypes {
  [name: string]: ts.Type
}

export class DecoratorMapGenerator {
  private userSymbols: Array<SymbolRef>

  private nodeTypes: INodeTypes

  private decorators: Array<string> | undefined

  constructor(
    userSymbols: Array<SymbolRef>,
    nodeTypes: INodeTypes,
    decorators: Array<string> | undefined = undefined,
  ) {
    this.userSymbols = userSymbols
    this.nodeTypes = nodeTypes
    this.decorators = decorators
  }

  public getUserSymbols(): Array<string> {
    return this.userSymbols.map((symbol) => symbol.name)
  }

  public getMapBySymbol(symbolName: string): IDecoratorMap {
    const nodeType = this.nodeTypes[symbolName]

    if (!nodeType) {
      throw new Error(`type ${symbolName} not found`)
    }

    return this.getDecoratorMap(nodeType)
  }

  private parseArguments(node: ts.Node): any {
    if (
      node.kind === ts.SyntaxKind.UndefinedKeyword ||
      node.kind === ts.SyntaxKind.NullKeyword
    ) {
      return null
    }

    if (node.kind === ts.SyntaxKind.StringLiteral) {
      return node.getText()
    }

    if (node.kind === ts.SyntaxKind.NumericLiteral) {
      return Number(node.getText())
    }

    if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
      return (node as ts.ObjectLiteralExpression).properties.reduce(
        (acc, curr) => {
          if (curr.kind === ts.SyntaxKind.PropertyAssignment) {
            const propKey = (curr as ts.PropertyAssignment).name.getText()

            return {
              ...acc,
              [propKey]: this.parseArguments(
                (curr as ts.PropertyAssignment).initializer,
              ),
            }
          }

          return acc
        },
        {},
      )
    }

    if (node.kind === ts.SyntaxKind.ArrayLiteralExpression) {
      return (node as ts.ArrayLiteralExpression).elements.map((el) =>
        this.parseArguments(el),
      )
    }

    console.warn(`ts.SyntaxKind = ${node.kind} is not supported`)

    return null
  }

  private isDecoratorAllowed(decoratorName: string): boolean {
    return this.decorators === undefined
      ? true
      : this.decorators.includes(decoratorName)
  }

  private getDecoratorMap(nodeType: ts.Type): IDecoratorMap {
    return nodeType.getProperties().reduce((accProps, currProp) => {
      const declarations = currProp.getDeclarations()

      if (declarations === undefined) {
        return accProps
      }

      const { decorators } = declarations[0]

      if (decorators === undefined) {
        return accProps
      }

      const decoratorsMap = decorators.reduce(
        (accDecorators, currDecorator) => {
          const expressionNode = currDecorator.expression

          if (expressionNode.kind !== ts.SyntaxKind.CallExpression) {
            return accDecorators
          }

          const decoratorName = (expressionNode as ts.CallExpression).expression.getText()

          if (!this.isDecoratorAllowed(decoratorName)) {
            return accDecorators
          }

          const decoratorArguments = (expressionNode as ts.CallExpression).arguments.map(
            (arg) => this.parseArguments(arg as ts.Expression),
          )

          return {
            ...accDecorators,
            [decoratorName]: decoratorArguments,
          }
        },
        {},
      )

      if (Object.entries(decoratorsMap).length === 0) {
        return accProps
      }

      return {
        ...accProps,
        [currProp.name]: decoratorsMap,
      }
    }, {})
  }
}
