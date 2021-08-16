import { Graph } from '../../graph/Graph'
import { ITypeEdge } from './ITypeEdge'
import { ITypeVertex } from './ITypeVertex'

export type ITypeGraph = Graph<ITypeVertex, ITypeEdge>
