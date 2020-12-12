import { Edge as EdgeInterface, Vertex } from '@codelab/alpha/shared/interface/graph'

export class Edge implements EdgeInterface {
  id: string

  start: Vertex

  end: Vertex

  constructor(start: Vertex, end: Vertex, id?: string) {
    this.start = start
    this.end = end
    this.id = id ?? `${start.id}_${end.id}`
  }
}
