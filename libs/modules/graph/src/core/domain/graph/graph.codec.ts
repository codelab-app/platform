import * as t from 'io-ts'
import { UUID } from 'io-ts-types'

export const GraphDTO = t.partial({
  id: t.string,
  label: t.string,
})

export type GraphDTO = t.TypeOf<typeof GraphDTO>

/**
 * Graph ValeObject Codec
 */
export const GraphVO = t.type({
  label: t.string,
})

export type GraphVO = t.TypeOf<typeof GraphVO>

/**
 * Graph Entity Codec
 */
export const GraphEntity = t.intersection([
  t.type({
    id: UUID,
    label: t.string,
  }),
  GraphVO,
])

export type GraphEntity = t.TypeOf<typeof GraphEntity>
