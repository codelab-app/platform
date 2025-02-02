import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared/infra/typebox'
import { Type } from '@sinclair/typebox'

import { ITypeKind } from './type-kind.enum'

export const BaseTypeSchema = Type.Object({
  __typename: Type.Literal(`${ITypeKind}`),
  id: Type.String(),
  kind: Type.Enum(ITypeKind),
  name: Type.String(),
  owner: Typebox.RefSchema,
})

export type IBaseType = Static<typeof BaseTypeSchema>
