import { z } from 'zod'
import { EdgeSchema, IEdge } from './edge.interface'
import { IVertex, IVertexInput, VertexSchema } from './vertex.interface'

export const GraphSchema = z.object({
  vertices: z.array(VertexSchema),
  edges: z.array(EdgeSchema),
})

/**
 * An IGraph is a normalized flat representation of a Tree
 * We use it for serializing/deserializing Trees
 * Use TreeService, or one of its subclasses to traverse it
 */
export interface IGraph<TVertex extends IVertex, TEdge extends IEdge> {
  vertices: Array<TVertex>
  edges: Array<TEdge>
}

/**
 * IGraph with stripped Vertex ids
 */
export interface IGraphInput<
  TVertex extends IVertexInput,
  TEdge extends IEdge,
> {
  vertices: Array<TVertex>
  edges: Array<TEdge>
}
