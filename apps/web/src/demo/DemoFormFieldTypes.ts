import { TypeKind } from '@codelab/shared/abstract/core'

export const DemoFormAtomData = {
  id: '0x5e005',
  name: 'Demo Form Atom Interface',
  typeKind: TypeKind.InterfaceType,
  typeGraph: {
    edges: [
      {
        source: '0x5e005',
        target: '0x5d8b9',
        id: '0x5e00f',
        key: 'PrimitiveBooleanField',
        name: 'Primitive Type(Boolean)',
      },
      {
        source: '0x5e005',
        target: '0x5d8ba',
        id: '0x5e014',
        key: 'PrimitiveFloatField',
        name: 'Primitive Type(Float)',
      },
      {
        source: '0x5e005',
        target: '0x5d8bb',
        id: '0x5e00c',
        key: 'PrimitiveIntegerField',
        name: 'Primitive Type(Integer)',
      },
      {
        source: '0x5e005',
        target: '0x5d8b8',
        id: '0x5e01b',
        key: 'PrimitiveStringField',
        name: 'Primitive Type(String)',
      },
      {
        source: '0x5e005',
        target: '0x5e004',
        id: '0x5e011',
        key: 'ArrayTypeStringField',
        name: 'Array Type(String)',
      },
      // Child of Array Type
      {
        source: '0x5e004',
        target: '0x5d8b8',
      },
      {
        source: '0x5e005',
        target: '0x5e002',
        id: '0x5e010',
        key: 'ObjectField',
        name: 'Interface Type(Object)',
      },
      {
        source: '0x5e002',
        target: '0x5d8bb',
        id: '0x5e012',
        key: 'ObjectFieldNumber',
        name: 'Object Field(Number)',
      },
      {
        source: '0x5e002',
        target: '0x5d8b8',
        id: '0x5e01a',
        key: 'ObjectFieldString',
        name: 'Object Field(String)',
      },
      {
        source: '0x5e005',
        target: '0x5e008',
        id: '0x5e013',
        key: 'EnumTypeField',
        name: 'Enum Type',
      },
      {
        source: '0x5e005',
        target: '0x5d8bc',
        id: '0x5e00d',
        key: 'LambdaTypeField',
        name: 'Lambda Type',
      },
      {
        source: '0x5e005',
        target: '0x5d8bf',
        id: '0x5e017',
        key: 'ElementTypeField',
        name: 'Element Type',
      },
      {
        source: '0x5e005',
        target: '0x5d8c0',
        id: '0x5e016',
        key: 'ComponentTypeField',
        name: 'Component Type',
      },
      {
        source: '0x5e005',
        target: '0x5d8c7',
        id: '0x5e019',
        key: 'AppTypeField',
        name: 'App Type',
      },
      {
        source: '0x5e005',
        target: '0x5d8b5',
        id: '0x5e018',
        key: 'ReactNodeTypeField',
        name: 'React Node Type',
      },
      {
        source: '0x5e005',
        target: '0x5d8b6',
        id: '0x5e015',
        key: 'RenderPropsTypeField',
        name: 'Render Props Type',
      },
      {
        source: '0x5e005',
        target: '0x5e003',
        id: '0x5e00a',
        key: 'UnionTypeField',
        name: 'Union Type Field',
      },
      // Child of Union Type
      {
        source: '0x5e003',
        target: '0x5d8ba',
      },
      {
        source: '0x5e003',
        target: '0x5d8bb',
      },
      {
        source: '0x5e005',
        target: '0x5d8c1',
        id: '0x5e00b',
        key: 'MonacoFieldCSS',
        name: 'Monaco Type(CSS)',
      },
      {
        source: '0x5e005',
        target: '0x5d8c2',
        id: '0x5e05b',
        key: 'MonacoFieldJavaScript',
        name: 'Monaco Type(JavaScript)',
      },
    ],
    vertices: [
      {
        __typename: TypeKind.InterfaceType,
        id: '0x5e005',
        name: 'Demo Form Atom Interface',
        typeKind: TypeKind.InterfaceType,
      },
      {
        __typename: TypeKind.PrimitiveType,
        id: '0x5d8b9',
        name: 'Boolean',
        typeKind: TypeKind.PrimitiveType,
        primitiveKind: 'Boolean',
      },
      {
        __typename: TypeKind.PrimitiveType,
        id: '0x5d8ba',
        name: 'Float',
        typeKind: TypeKind.PrimitiveType,
        primitiveKind: 'Float',
      },
      {
        __typename: TypeKind.PrimitiveType,
        id: '0x5d8bb',
        name: 'Integer',
        typeKind: TypeKind.PrimitiveType,
        primitiveKind: 'Integer',
      },
      {
        __typename: TypeKind.PrimitiveType,
        id: '0x5d8b8',
        name: 'String',
        typeKind: TypeKind.PrimitiveType,
        primitiveKind: 'String',
      },
      {
        __typename: TypeKind.ArrayType,
        id: '0x5e004',
        name: 'DemoArrayTypeString',
        typeKind: TypeKind.ArrayType,
      },
      {
        __typename: TypeKind.InterfaceType,
        id: '0x5e002',
        name: 'DemoAtomObject',
        typeKind: TypeKind.InterfaceType,
      },
      {
        __typename: TypeKind.EnumType,
        id: '0x5e008',
        name: 'DemoEnum',
        typeKind: TypeKind.EnumType,
        allowedValues: [
          {
            id: '0x5e007',
            name: 'Enum1',
            value: 'Enum1',
          },
          {
            id: '0x5e009',
            name: 'Enum2',
            value: 'Enum2',
          },
          {
            id: '0x5e006',
            name: 'Enum3',
            value: 'Enum3',
          },
        ],
      },
      {
        __typename: TypeKind.LambdaType,
        id: '0x5d8bc',
        name: 'Lambda',
        typeKind: TypeKind.LambdaType,
      },
      {
        __typename: TypeKind.ElementType,
        id: '0x5d8bf',
        name: 'Element',
        typeKind: TypeKind.ElementType,
        elementKind: 'AllElements',
      },
      {
        __typename: TypeKind.ComponentType,
        id: '0x5d8c0',
        name: 'Component',
        typeKind: TypeKind.ComponentType,
      },
      {
        __typename: TypeKind.AppType,
        id: '0x5d8c7',
        name: 'App',
        typeKind: TypeKind.AppType,
      },
      {
        __typename: TypeKind.ReactNodeType,
        id: '0x5d8b5',
        name: 'ReactNode',
        typeKind: TypeKind.ReactNodeType,
      },
      {
        __typename: TypeKind.RenderPropsType,
        id: '0x5d8b6',
        name: 'RenderProps',
        typeKind: TypeKind.RenderPropsType,
      },
      {
        __typename: TypeKind.UnionType,
        id: '0x5e003',
        name: 'Demo Primitive Union',
        typeKind: TypeKind.UnionType,
        typeIdsOfUnionType: ['0x5d8ba', '0x5d8bb'],
      },
      {
        __typename: TypeKind.MonacoType,
        id: '0x5d8c1',
        name: 'MonacoCss',
        typeKind: TypeKind.MonacoType,
        language: 'CSSINJS',
      },
      {
        __typename: TypeKind.MonacoType,
        id: '0x5d8c2',
        name: 'MonacoJavascript',
        typeKind: TypeKind.MonacoType,
        language: 'JavaScript',
      },
    ],
  },
}
