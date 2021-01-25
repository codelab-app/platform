import * as t from 'io-ts'
import { UUID } from 'io-ts-types'

export const VertexDTO = t.partial({
  id: t.string,
  type: t.string,
})

export type VertexDTO = t.TypeOf<typeof VertexDTO>

/**
 * Vertex ValeObject Codec
 */
export const VertexVO = t.intersection([
  t.type({
    type: t.string,
  }),
  t.partial({
    props: t.UnknownRecord,
  }),
])

export type VertexVO = t.TypeOf<typeof VertexVO>

/**
 * Vertex Entity Codec
 */
export const VertexEntity = t.intersection([
  t.type({
    id: UUID,
    type: t.string,
  }),
  VertexVO,
])

export type VertexEntity = t.TypeOf<typeof VertexEntity>
