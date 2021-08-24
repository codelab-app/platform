import { Graph, GraphInput } from '../../graph/Graph'
import { ITypeEdge } from './ITypeEdge'
import { ITypeVertex } from './ITypeVertex'
import { ITypeVertexInput } from './ITypeVertex.input'

export type ITypeGraphInput = GraphInput<ITypeVertexInput, ITypeEdge>

export type ITypeGraph = Graph<ITypeVertex, ITypeEdge>
