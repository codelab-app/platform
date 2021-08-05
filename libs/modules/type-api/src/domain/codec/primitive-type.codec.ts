import { fromEnum, PrimitiveKind } from '@codelab/backend'
import * as t from 'io-ts'

export const PrimitiveKindC = fromEnum<PrimitiveKind>(
  'PrimitiveKind',
  PrimitiveKind,
)

export const PrimitiveTypeC = t.type({
  name: t.string,
  kind: PrimitiveKindC,
})

export type PrimitiveTypeC = t.TypeOf<typeof PrimitiveTypeC>
