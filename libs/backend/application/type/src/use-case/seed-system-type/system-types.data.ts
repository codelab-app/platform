import type {
  IType,
  ITypeExport,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { DistributiveOmit } from '@emotion/react'
import { v4 } from 'uuid'

export const systemTypesData: Array<DistributiveOmit<ITypeExport, 'owner'>> = [
  // PrimitiveTypes
  {
    __typename: `${ITypeKind.PrimitiveType}`,
    id: v4(),
    name: IPrimitiveTypeKind.String,
    kind: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.String,
  },
  // {
  //   __typename: `${ITypeKind.PrimitiveType}`,
  //   id: v4(),
  //   name: IPrimitiveTypeKind.Boolean,
  //   kind: ITypeKind.PrimitiveType,
  //   primitiveKind: IPrimitiveTypeKind.Boolean,
  // },
  // {
  //   __typename: `${ITypeKind.PrimitiveType}`,
  //   id: v4(),
  //   name: IPrimitiveTypeKind.Number,
  //   kind: ITypeKind.PrimitiveType,
  //   primitiveKind: IPrimitiveTypeKind.Number,
  // },
  // {
  //   __typename: `${ITypeKind.PrimitiveType}`,
  //   id: v4(),
  //   name: IPrimitiveTypeKind.Integer,
  //   kind: ITypeKind.PrimitiveType,
  //   primitiveKind: IPrimitiveTypeKind.Integer,
  // },
  // // Other types
  // {
  //   __typename: `${ITypeKind.ReactNodeType}`,
  //   id: v4(),
  //   name: ITypeKind.ReactNodeType,
  //   kind: ITypeKind.ReactNodeType,
  // },
  // {
  //   __typename: `${ITypeKind.RenderPropsType}`,
  //   id: v4(),
  //   name: ITypeKind.RenderPropsType,
  //   kind: ITypeKind.RenderPropsType,
  // },
  // {
  //   __typename: `${ITypeKind.ActionType}`,
  //   id: v4(),
  //   name: ITypeKind.ActionType,
  //   kind: ITypeKind.ActionType,
  // },
]
