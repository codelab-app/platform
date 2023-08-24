import type { Static, TLiteral } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { ITypeKind } from '../type-kind.enum'
import { IAuth0Owner } from '../user.interface'

export const IBaseTypeDTO = <T extends TLiteral<`${ITypeKind}`>>(schema: T) =>
  Type.Composite([
    IAuth0Owner,
    Type.Object({
      __typename: Type.Optional(schema),
      id: Type.String(),
      kind: Type.Enum(ITypeKind),
      name: Type.String(),
    }),
  ])

export type IBaseTypeDTO<
  T extends TLiteral<`${ITypeKind}`> = TLiteral<`${ITypeKind}`>,
> = Static<ReturnType<typeof IBaseTypeDTO<T>>>
