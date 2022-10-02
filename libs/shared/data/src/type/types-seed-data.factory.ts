import { ITypeExport } from '@codelab/backend/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

type CreateSeedTypes = (ids?: Array<string>) => Array<ITypeExport>

export const createSeedTypesData: CreateSeedTypes = ([
  stringId = v4(),
  booleanId = v4(),
  floatId = v4(),
  integerId = v4(),
] = []) => [
  // PrimitiveTypes
  {
    id: stringId,
    __typename: 'PrimitiveType',
    name: IPrimitiveTypeKind.String,
    kind: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.String,
  },
  {
    id: booleanId,
    __typename: 'PrimitiveType',
    name: IPrimitiveTypeKind.Boolean,
    kind: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.Boolean,
  },
  {
    id: floatId,
    __typename: 'PrimitiveType',
    name: IPrimitiveTypeKind.Float,
    kind: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.Float,
  },
  {
    id: integerId,
    __typename: 'PrimitiveType',
    name: IPrimitiveTypeKind.Integer,
    kind: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.Integer,
  },
  // Other types
  {
    id: v4(),
    __typename: 'ReactNodeType',
    name: ITypeKind.ReactNodeType,
    kind: ITypeKind.ReactNodeType,
  },
  {
    id: v4(),
    __typename: 'RenderPropsType',
    name: ITypeKind.RenderPropsType,
    kind: ITypeKind.RenderPropsType,
  },
]
