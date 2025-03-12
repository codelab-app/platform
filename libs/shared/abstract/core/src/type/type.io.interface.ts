import type { Static, TSchema } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { typeDtoSchemas } from './type.dto.interface'

export const omitOwner = <T extends TSchema>(schema: T) =>
  Type.Omit(schema, ['owner'])

const nameSchema = Type.Object({ name: Type.String() })

export const TypeDtoWithoutOwnerSchema = Type.Union(
  typeDtoSchemas(nameSchema).map(omitOwner),
  {
    discriminantKey: '__typename',
    errorMessage: 'Unknown type',
  },
)

export type ITypeDtoWithoutOwner = Static<typeof TypeDtoWithoutOwnerSchema>
