import {
  IType,
  PrimitiveTypeKind,
  TypeKind,
} from '@codelab/shared/abstract/core'

export const testDataByTypeName: Record<
  string,
  Array<{ vertex?: Partial<IType>; parent?: Partial<IType> }>
> = {
  test1: [
    {
      vertex: {
        name: 'test1',
        typeKind: TypeKind.ArrayType,
      },
      parent: undefined,
    },
    {
      parent: {
        name: 'test1',
        typeKind: TypeKind.ArrayType,
      },
      vertex: {
        name: PrimitiveTypeKind.String,
        typeKind: TypeKind.PrimitiveType,
        primitiveKind: PrimitiveTypeKind.String,
      },
    },
  ],
  test2: [
    {
      vertex: {
        name: 'test2',
        typeKind: TypeKind.InterfaceType,
      },
      parent: undefined,
    },
    {
      vertex: {
        name: 'test1',
        typeKind: TypeKind.ArrayType,
      },
      parent: {
        name: 'test2',
        typeKind: TypeKind.InterfaceType,
      },
    },
    {
      parent: {
        name: 'test1',
        typeKind: TypeKind.ArrayType,
      },
      vertex: {
        name: PrimitiveTypeKind.String,
        typeKind: TypeKind.PrimitiveType,
        primitiveKind: PrimitiveTypeKind.String,
      },
    },
  ],
}

export const importTypesData = [
  {
    id: '0x57e67',
    name: 'test1',
    typeKind: TypeKind.ArrayType,
    typeGraph: {
      edges: [
        {
          source: '0x57e67',
          target: '0x5574f',
        },
      ],
      vertices: [
        {
          __typename: TypeKind.ArrayType,
          id: '0x57e67',
          name: 'test1',
          typeKind: TypeKind.ArrayType,
        },
        {
          __typename: TypeKind.PrimitiveType,
          id: '0x5574f',
          name: PrimitiveTypeKind.String,
          typeKind: TypeKind.PrimitiveType,
          primitiveKind: PrimitiveTypeKind.String,
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
          __typename: TypeKind.PrimitiveType,
          id: '0x5574f',
          name: PrimitiveTypeKind.String,
          typeKind: TypeKind.PrimitiveType,
          primitiveKind: PrimitiveTypeKind.String,
        },
        {
          __typename: TypeKind.ArrayType,
          id: '0x57e67',
          name: 'test1',
          typeKind: TypeKind.ArrayType,
        },
        {
          __typename: TypeKind.InterfaceType,
          id: '0x57e6a',
          name: 'test2',
          typeKind: TypeKind.InterfaceType,
        },
      ],
    },
  },
]
