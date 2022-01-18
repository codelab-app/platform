export const testDataByTypeName: any = {
  test1: [
    {
      vertex: {
        __typename: 'ArrayType',
        name: 'test1',
        typeKind: 'ArrayType',
      },
      parent: undefined,
    },
    {
      parent: {
        __typename: 'ArrayType',
        name: 'test1',
        typeKind: 'ArrayType',
      },
      vertex: {
        __typename: 'PrimitiveType',
        name: 'String',
        typeKind: 'PrimitiveType',
        primitiveKind: 'String',
      },
    },
  ],
  test2: [
    {
      vertex: {
        __typename: 'InterfaceType',
        name: 'test2',
        typeKind: 'InterfaceType',
      },
      parent: undefined,
    },
    {
      vertex: {
        __typename: 'ArrayType',
        name: 'test1',
        typeKind: 'ArrayType',
      },
      parent: {
        __typename: 'InterfaceType',
        name: 'test2',
        typeKind: 'InterfaceType',
      },
    },
    {
      parent: {
        __typename: 'ArrayType',
        name: 'test1',
        typeKind: 'ArrayType',
      },
      vertex: {
        __typename: 'PrimitiveType',
        name: 'String',
        typeKind: 'PrimitiveType',
        primitiveKind: 'String',
      },
    },
  ],
}

export const importTypesData = [
  {
    id: '0x57e67',
    name: 'test1',
    typeKind: 'ArrayType',
    typeGraph: {
      edges: [
        {
          source: '0x57e67',
          target: '0x5574f',
        },
      ],
      vertices: [
        {
          __typename: 'ArrayType',
          id: '0x57e67',
          name: 'test1',
          typeKind: 'ArrayType',
        },
        {
          __typename: 'PrimitiveType',
          id: '0x5574f',
          name: 'String',
          typeKind: 'PrimitiveType',
          primitiveKind: 'String',
        },
      ],
    },
  },
  {
    id: '0x57e6a',
    name: 'test2',
    typeKind: 'InterfaceType',
    typeGraph: {
      edges: [
        {
          source: '0x57e67',
          target: '0x5574f',
        },
        {
          source: '0x57e6a',
          target: '0x57e67',
          description: 'null',
          id: '0x57e6b',
          key: 'asdsa',
          name: 'null',
        },
      ],
      vertices: [
        {
          __typename: 'PrimitiveType',
          id: '0x5574f',
          name: 'String',
          typeKind: 'PrimitiveType',
          primitiveKind: 'String',
        },
        {
          __typename: 'ArrayType',
          id: '0x57e67',
          name: 'test1',
          typeKind: 'ArrayType',
        },
        {
          __typename: 'InterfaceType',
          id: '0x57e6a',
          name: 'test2',
          typeKind: 'InterfaceType',
        },
      ],
    },
  },
]
