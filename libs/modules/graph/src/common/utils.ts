import {
  FindEdgeBy,
  FindEdgeByGraphID,
  FindEdgeByID,
  FindGraphBy,
  FindGraphByID,
  FindVertexBy,
  FindVertexByGraphID,
  FindVertexByID,
} from './CommonTypes'

export const isGraphById = (value: FindGraphBy): value is FindGraphByID => {
  return (value as FindGraphByID).id !== undefined
}

export const isVertexById = (value: FindVertexBy): value is FindVertexByID => {
  return (value as FindVertexByID).id !== undefined
}

export const isVertexByGraphId = (
  value: FindVertexBy,
): value is FindVertexByGraphID => {
  return (value as FindVertexByGraphID).graph_id !== undefined
}

export const isEdgeById = (value: FindEdgeBy): value is FindEdgeByID => {
  return (value as FindEdgeByID).id !== undefined
}

export const isEdgeByGraphId = (
  value: FindEdgeBy,
): value is FindEdgeByGraphID => {
  return (value as FindEdgeByGraphID).graph_id !== undefined
}
