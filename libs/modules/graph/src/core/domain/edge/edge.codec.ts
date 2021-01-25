import * as t from 'io-ts'
import { UUID } from 'io-ts-types'

export const EdgeDTO = t.partial({
  id: t.string,
  order: t.number,
  source: t.string,
  target: t.string,
  props: t.object,
})

export type EdgeDTO = t.TypeOf<typeof EdgeDTO>

/**
 * Edge ValeObject Codec
 */
export const EdgeVO = t.intersection([
  t.type({
    source: t.string,
    target: t.string,
    order: t.number,
  }),
  t.partial({
    props: t.object,
  }),
])

export type EdgeVO = t.TypeOf<typeof EdgeVO>

/**
 * Edge Entity Codec
 */
export const EdgeEntity = t.intersection([
  t.type({
    id: UUID,
  }),
  EdgeVO,
])

export type EdgeEntity = t.TypeOf<typeof EdgeEntity>
