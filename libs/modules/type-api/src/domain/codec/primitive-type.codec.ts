import { fromEnum } from '@codelab/backend'
import * as t from 'io-ts'
import { PrimitiveKind } from '../../models/types/primitive-type'

export const PrimitiveKindC = fromEnum<PrimitiveKind>(
  'PrimitiveKind',
  PrimitiveKind,
)

export const PrimitiveTypeC = t.type({
  name: t.string,
  kind: PrimitiveKindC,
})

export type PrimitiveTypeC = t.TypeOf<typeof PrimitiveTypeC>
