import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/abstract/typebox'
import { Type } from '@sinclair/typebox'

import { ITypeKind } from './type-kind.enum'

export const BaseTypeSchema = Type.Object({
  __typename: Type.Literal(`${ITypeKind}`),
  id: Type.String(),
  kind: Type.Enum(ITypeKind),
  name: Type.String(),
})

/**
 * JSON export
 */
export const BaseTypeExportSchema = Type.Object({
  __typename: Type.String(),
  id: Type.String(),
  kind: Type.String(),
  name: Type.String(),
})

export type IBaseType = Static<typeof BaseTypeSchema>

export type IBaseTypeDto<T extends `${ITypeKind}` = `${ITypeKind}`> = Static<
  ReturnType<typeof BaseTypeDtoSchema<T>>
>

/**
 * For GraphQL create, the api takes in an enum
 */
export const BaseTypeDtoSchema = <T extends `${ITypeKind}`>(kind: T) =>
  Type.Object({
    /**
     * Needs to be optional since our Neo4j OGM returns only optional
     */
    __typename: Type.Literal<T>(kind),
    id: Type.String(),
    // kind: ITypeKindTransform,
    kind: Type.Enum(ITypeKind),
    name: Type.String(),
    owner: Typebox.Ref,
  })
