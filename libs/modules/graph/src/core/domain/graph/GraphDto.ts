import { Optional } from 'utility-types'
import { Graph } from './Graph'

export type GraphDto = Optional<Graph, 'vertices' | 'edges'>
