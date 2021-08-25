export interface Vertex {
  id: string
  name?: string | null
}

/**
 * Value objects don't have id's
 */
export type VertexValueObject = Omit<Vertex, 'id'>

export type VertexInput = Omit<Vertex, 'id'>
