import type { ICreateType } from '@codelab/backend/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import type { DistributiveOmit } from '@emotion/react'

export const systemTypesData: Array<DistributiveOmit<ICreateType, 'owner'>> = [
  /**
   * PrimitiveTypes
   */
  {
    __typename: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.String,
  },
  {
    __typename: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.Boolean,
  },
  {
    __typename: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.Number,
  },
  {
    __typename: ITypeKind.PrimitiveType,
    primitiveKind: IPrimitiveTypeKind.Integer,
  },
  /**
   * Other types
   */
  {
    __typename: ITypeKind.ReactNodeType,
  },
  {
    __typename: ITypeKind.RenderPropsType,
  },
  {
    __typename: ITypeKind.ActionType,
  },
]
