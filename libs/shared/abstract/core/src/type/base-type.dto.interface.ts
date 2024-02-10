import type { Static, TLiteral } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from './type-kind.enum'

export const IBaseType = Type.Object({
  __typename: Type.Literal(`${ITypeKind}`),
  id: Type.String(),
  kind: Type.Enum(ITypeKind),
  name: Type.String(),
})

export type IBaseType = Static<typeof IBaseType>

export type IBaseTypeDTO<
  T extends TLiteral<`${ITypeKind}`> = TLiteral<`${ITypeKind}`>,
> = Static<ReturnType<typeof IBaseTypeDTO<T>>>

export const IBaseTypeDTO = <T extends TLiteral<`${ITypeKind}`>>(schema: T) =>
  Type.Object({
    /**
     * Needs to be optional since our Neo4j OGM returns only optional
     */
    __typename: schema,
    id: Type.String(),
    kind: Type.Enum(ITypeKind),
    name: Type.String(),
  })
