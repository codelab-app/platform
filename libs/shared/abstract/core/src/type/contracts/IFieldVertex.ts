import { Vertex } from '../../graph/vertex'

export interface IFieldVertex extends Vertex {
  key: string
  name?: string | null
  description?: string | null
}
