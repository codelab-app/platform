import { v4 as uuidv4 } from 'uuid'
import { EdgeA, EdgeI, IEdge } from '@codelab/shared/interface/graph'

export class Edge implements IEdge {
  id: string

  start: string

  end: string

  label: string

  constructor({ id, label = '', start, end }: EdgeA) {
    this.id = id
    this.start = start
    this.end = end
    this.label = label
  }

  static async fromCreateForm({ label, start, end }: EdgeI): Promise<Edge> {
    // Simulate remote data storage,
    const data = await Promise.resolve({
      id: uuidv4(),
      label,
      start,
      end,
    })

    return new Edge(data)
  }
}
