import type { ICreateType } from '@codelab/backend/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { DistributiveOmit } from '@emotion/react'
import { v4 } from 'uuid'

export const systemTypesData: Array<DistributiveOmit<ICreateType, 'owner'>> = [
  /**
   * PrimitiveTypes
   */
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    primitiveKind: IPrimitiveTypeKind.String,
  },
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    primitiveKind: IPrimitiveTypeKind.Boolean,
  },
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    primitiveKind: IPrimitiveTypeKind.Number,
  },
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    primitiveKind: IPrimitiveTypeKind.Integer,
  },
  /**
   * Other types
   */
  {
    __typename: ITypeKind.ReactNodeType,
    id: v4(),
  },
  {
    __typename: ITypeKind.RenderPropsType,
    id: v4(),
  },
  {
    __typename: ITypeKind.ActionType,
    id: v4(),
  },
]
