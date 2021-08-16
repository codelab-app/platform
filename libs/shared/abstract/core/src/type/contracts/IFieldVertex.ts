import { Vertex } from '../../graph/Vertex'

export interface IFieldVertex extends Vertex {
  key: string
  name?: string | null
  description?: string | null
}
