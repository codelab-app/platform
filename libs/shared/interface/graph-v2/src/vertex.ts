import { EntityA } from '../../entity/src/entity'
import { NodeType } from '../../node/src/enums/node-enum'
import { EntityI } from '@codelab/shared/interface/entity'

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
export interface VertexI extends EntityI {
  parent?: string
  label?: string
  type: NodeType
}

/**
 * Working type, (fetched from db)
 */
export interface VertexA extends EntityA {
  id: string
  parent?: string
  label?: string
  type: NodeType
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
