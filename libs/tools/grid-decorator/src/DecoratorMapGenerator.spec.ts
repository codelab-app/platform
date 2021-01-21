import ts from 'typescript'
import { DecoratorMapGenerator, INodeTypes } from './DecoratorMapGenerator'

describe('DecoratorMapGenerator', () => {
  const typeName = 'ClassName'
  const testSymbolRef = {
    name: typeName,
    typeName,
    fullyQualifiedName: typeName,
    symbol: ({} as unknown) as ts.Symbol,
  }
  const decoratorName = 'decor'
  const classPropertyKey = 'classProp'

  describe('specify list of supported decorators', () => {
    const decoratorTestVal = 'str'
    const secondDecoratorName = 'secondDecor'
    const secondDecoratorTestVal = 'second str'

    const nodeTypes = {
      [typeName]: ({
        getProperties: jest.fn().mockReturnValue([
          {
            name: classPropertyKey,
            getDeclarations: jest.fn().mockReturnValue([
              {
                decorators: [
                  {
                    expression: {
                      kind: ts.SyntaxKind.CallExpression,
                      expression: {
                        getText: jest.fn().mockReturnValue(decoratorName),
                      },
                      arguments: [
                        {
                          kind: ts.SyntaxKind.StringLiteral,
                          getText: jest.fn().mockReturnValue(decoratorTestVal),
                        },
                      ],
                    },
                  },
                  {
                    expression: {
                      kind: ts.SyntaxKind.CallExpression,
                      expression: {
                        getText: jest.fn().mockReturnValue(secondDecoratorName),
                      },
                      arguments: [
                        {
                          kind: ts.SyntaxKind.StringLiteral,
                          getText: jest
                            .fn()
                            .mockReturnValue(secondDecoratorTestVal),
                        },
                      ],
                    },
                  },
                ],
              },
            ]),
          },
        ]),
      } as unknown) as ts.Type,
    } as INodeTypes

    it('should be able to specify empty list', () => {
      const generator = new DecoratorMapGenerator(
        [testSymbolRef],
        nodeTypes,
        [],
      )

      expect(generator.getMapBySymbol(typeName)).toEqual({})
    })
    it('should process all decorators if list is not passed', () => {
      const generator = new DecoratorMapGenerator([testSymbolRef], nodeTypes)

      expect(generator.getMapBySymbol(typeName)).toEqual({
        [classPropertyKey]: {
          [decoratorName]: [decoratorTestVal],
          [secondDecoratorName]: [secondDecoratorTestVal],
        },
      })
    })
    it('should process only decorators listed in passed list', () => {
      const generator = new DecoratorMapGenerator([testSymbolRef], nodeTypes, [
        decoratorName,
      ])

      expect(generator.getMapBySymbol(typeName)).toEqual({
        [classPropertyKey]: {
          [decoratorName]: [decoratorTestVal],
        },
      })
    })
  })
  describe('getMapBySymbol', () => {
    it('should return empty object if there are no decorators', () => {
      const nodeTypes = {
        [typeName]: ({
          getProperties: jest.fn().mockReturnValue([
            {
              getDeclarations: jest.fn().mockReturnValue([
                {
                  decorators: undefined,
                },
              ]),
            },
          ]),
        } as unknown) as ts.Type,
      } as INodeTypes

      const generator = new DecoratorMapGenerator([testSymbolRef], nodeTypes)

      expect(generator.getMapBySymbol(typeName)).toEqual({})
    })

    it('should support "string"-type agrument', () => {
      const testVal = 'simple string'

      const nodeTypes = {
        [typeName]: ({
          getProperties: jest.fn().mockReturnValue([
            {
              name: classPropertyKey,
              getDeclarations: jest.fn().mockReturnValue([
                {
                  decorators: [
                    {
                      expression: {
                        kind: ts.SyntaxKind.CallExpression,
                        expression: {
                          getText: jest.fn().mockReturnValue(decoratorName),
                        },
                        arguments: [
                          {
                            kind: ts.SyntaxKind.StringLiteral,
                            getText: jest.fn().mockReturnValue(testVal),
                          },
                        ],
                      },
                    },
                  ],
                },
              ]),
            },
          ]),
        } as unknown) as ts.Type,
      } as INodeTypes

      const generator = new DecoratorMapGenerator([testSymbolRef], nodeTypes)

      expect(generator.getMapBySymbol(typeName)).toEqual({
        [classPropertyKey]: {
          [decoratorName]: [testVal],
        },
      })
    })
    it('should support "number"-type agrument', () => {
      const testVal = 1

      const nodeTypes = {
        [typeName]: ({
          getProperties: jest.fn().mockReturnValue([
            {
              name: classPropertyKey,
              getDeclarations: jest.fn().mockReturnValue([
                {
                  decorators: [
                    {
                      expression: {
                        kind: ts.SyntaxKind.CallExpression,
                        expression: {
                          getText: jest.fn().mockReturnValue(decoratorName),
                        },
                        arguments: [
                          {
                            kind: ts.SyntaxKind.NumericLiteral,
                            getText: jest.fn().mockReturnValue(testVal),
                          },
                        ],
                      },
                    },
                  ],
                },
              ]),
            },
          ]),
        } as unknown) as ts.Type,
      } as INodeTypes

      const generator = new DecoratorMapGenerator([testSymbolRef], nodeTypes)

      expect(generator.getMapBySymbol(typeName)).toEqual({
        [classPropertyKey]: {
          [decoratorName]: [testVal],
        },
      })
    })
    it('should support "array"-type agrument', () => {
      const nodeTypes = {
        [typeName]: ({
          getProperties: jest.fn().mockReturnValue([
            {
              name: classPropertyKey,
              getDeclarations: jest.fn().mockReturnValue([
                {
                  decorators: [
                    {
                      expression: {
                        kind: ts.SyntaxKind.CallExpression,
                        expression: {
                          getText: jest.fn().mockReturnValue(decoratorName),
                        },
                        arguments: [
                          {
                            kind: ts.SyntaxKind.ArrayLiteralExpression,
                            elements: [
                              {
                                kind: ts.SyntaxKind.NumericLiteral,
                                getText: jest.fn().mockReturnValue(1),
                              },
                              {
                                kind: ts.SyntaxKind.StringLiteral,
                                getText: jest.fn().mockReturnValue('2'),
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              ]),
            },
          ]),
        } as unknown) as ts.Type,
      } as INodeTypes

      const generator = new DecoratorMapGenerator([testSymbolRef], nodeTypes)

      expect(generator.getMapBySymbol(typeName)).toEqual({
        [classPropertyKey]: {
          [decoratorName]: [[1, '2']],
        },
      })
    })
    it('should support nested "object"-type agrument', () => {
      const nodeTypes = {
        [typeName]: ({
          getProperties: jest.fn().mockReturnValue([
            {
              name: classPropertyKey,
              getDeclarations: jest.fn().mockReturnValue([
                {
                  decorators: [
                    {
                      expression: {
                        kind: ts.SyntaxKind.CallExpression,
                        expression: {
                          getText: jest.fn().mockReturnValue(decoratorName),
                        },
                        arguments: [
                          {
                            kind: ts.SyntaxKind.ObjectLiteralExpression,
                            properties: [
                              {
                                kind: ts.SyntaxKind.PropertyAssignment,
                                name: {
                                  getText: jest.fn().mockReturnValue('key1'),
                                },
                                initializer: {
                                  kind: ts.SyntaxKind.NumericLiteral,
                                  getText: jest.fn().mockReturnValue('1'),
                                },
                              },
                              {
                                kind: ts.SyntaxKind.PropertyAssignment,
                                name: {
                                  getText: jest.fn().mockReturnValue('key2'),
                                },
                                initializer: {
                                  kind: ts.SyntaxKind.ObjectLiteralExpression,
                                  properties: [
                                    {
                                      kind: ts.SyntaxKind.PropertyAssignment,
                                      name: {
                                        getText: jest
                                          .fn()
                                          .mockReturnValue('key2_1'),
                                      },
                                      initializer: {
                                        kind: ts.SyntaxKind.StringLiteral,
                                        getText: jest
                                          .fn()
                                          .mockReturnValue('2_1'),
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              ]),
            },
          ]),
        } as unknown) as ts.Type,
      } as INodeTypes

      const generator = new DecoratorMapGenerator([testSymbolRef], nodeTypes)

      expect(generator.getMapBySymbol(typeName)).toEqual({
        [classPropertyKey]: {
          [decoratorName]: [
            {
              key1: 1,
              key2: {
                key2_1: '2_1',
              },
            },
          ],
        },
      })
    })
    it('should support multiple agrument', () => {
      const testVal1 = 'simple string'
      const testVal2 = 1

      const nodeTypes = {
        [typeName]: ({
          getProperties: jest.fn().mockReturnValue([
            {
              name: classPropertyKey,
              getDeclarations: jest.fn().mockReturnValue([
                {
                  decorators: [
                    {
                      expression: {
                        kind: ts.SyntaxKind.CallExpression,
                        expression: {
                          getText: jest.fn().mockReturnValue(decoratorName),
                        },
                        arguments: [
                          {
                            kind: ts.SyntaxKind.StringLiteral,
                            getText: jest.fn().mockReturnValue(testVal1),
                          },
                          {
                            kind: ts.SyntaxKind.NumericLiteral,
                            getText: jest.fn().mockReturnValue(testVal2),
                          },
                        ],
                      },
                    },
                  ],
                },
              ]),
            },
          ]),
        } as unknown) as ts.Type,
      } as INodeTypes

      const generator = new DecoratorMapGenerator([testSymbolRef], nodeTypes)

      expect(generator.getMapBySymbol(typeName)).toEqual({
        [classPropertyKey]: {
          [decoratorName]: [testVal1, testVal2],
        },
      })
    })
    it('should support multiple decorators', () => {
      const decoratorTestVal = 'str'
      const secondDecoratorName = 'secondDecor'
      const secondDecoratorTestVal = 'second str'

      const nodeTypes = {
        [typeName]: ({
          getProperties: jest.fn().mockReturnValue([
            {
              name: classPropertyKey,
              getDeclarations: jest.fn().mockReturnValue([
                {
                  decorators: [
                    {
                      expression: {
                        kind: ts.SyntaxKind.CallExpression,
                        expression: {
                          getText: jest.fn().mockReturnValue(decoratorName),
                        },
                        arguments: [
                          {
                            kind: ts.SyntaxKind.StringLiteral,
                            getText: jest
                              .fn()
                              .mockReturnValue(decoratorTestVal),
                          },
                        ],
                      },
                    },
                    {
                      expression: {
                        kind: ts.SyntaxKind.CallExpression,
                        expression: {
                          getText: jest
                            .fn()
                            .mockReturnValue(secondDecoratorName),
                        },
                        arguments: [
                          {
                            kind: ts.SyntaxKind.StringLiteral,
                            getText: jest
                              .fn()
                              .mockReturnValue(secondDecoratorTestVal),
                          },
                        ],
                      },
                    },
                  ],
                },
              ]),
            },
          ]),
        } as unknown) as ts.Type,
      } as INodeTypes

      const generator = new DecoratorMapGenerator([testSymbolRef], nodeTypes)

      expect(generator.getMapBySymbol(typeName)).toEqual({
        [classPropertyKey]: {
          [decoratorName]: [decoratorTestVal],
          [secondDecoratorName]: [secondDecoratorTestVal],
        },
      })
    })
  })
})
