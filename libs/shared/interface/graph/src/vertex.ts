import { NodeType } from '../../node/src/enums/node-enum'

/**
 * Used for testing
 */
export interface VertexT {
  id: string
  parent?: string
}

/**
 * Input for Vertex model (from form)
 */
export interface VertexI {
  parent?: string
  label?: string
  type: NodeType
}

/**
 * Working type, (fetched from db)
 */
export interface VertexA extends VertexI {
  id: string
}

export interface IVertex extends VertexA {
  test?: any
}

export const isVertexI = (vertex: any): vertex is VertexI => {
  if (typeof vertex?.id === 'string') {
    return false
  }

  return true
}

export const isVertexA = (vertex: any): vertex is VertexA => {
  if (typeof vertex?.id !== 'string') {
    return false
  }

  return true
}
