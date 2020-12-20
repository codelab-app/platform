import { Graph } from '../domain/graph'

export interface GraphRepositoryPort {
  findAll(): Promise<Array<Graph>>
  createGraph(graph: Graph): Promise<Graph>
}
