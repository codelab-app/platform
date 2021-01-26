import * as t from 'io-ts'
import { UUID } from 'io-ts-types'
import { VertexTypeC } from './vertex-type.codec'

export const VertexDTO = t.partial({
  id: t.string,
  type: VertexTypeC,
})

export type VertexDTO = t.TypeOf<typeof VertexDTO>

/**
 * Vertex ValeObject Codec
 */
export const VertexVO = t.partial({
  type: VertexTypeC,
  props: t.UnknownRecord,
})

export type VertexVO = t.TypeOf<typeof VertexVO>

/**
 * Vertex Entity Codec
 */
export const VertexEntity = t.intersection([
  t.type({
    id: UUID,
  }),
  VertexVO,
])

export type VertexEntity = t.TypeOf<typeof VertexEntity>
