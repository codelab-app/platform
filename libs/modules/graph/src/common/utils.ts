import {
  FindEdgeBy,
  FindEdgeByID,
  FindEdgeBySource,
  FindEdgeByTarget,
  FindVertexBy,
  FindVertexByID,
} from './CommonTypes'

export const isVertexId = (value: FindVertexBy): value is FindVertexByID => {
  return (value as FindVertexByID).id !== undefined
}

// export const isGraphId = (
//   value: FindVertexBy,
// ): value is FindVertexByGraphID => {
//   return (value as FindVertexByGraphID).graph_id !== undefined
// }

export const isEdgeId = (value: FindEdgeBy): value is FindEdgeByID => {
  return (value as FindEdgeByID).id !== undefined
}

export const isEdgeSource = (value: FindEdgeBy): value is FindEdgeBySource => {
  return (value as FindEdgeBySource).source !== undefined
}

export const isEdgeTarget = (value: FindEdgeBy): value is FindEdgeByTarget => {
  return (value as FindEdgeByTarget).target !== undefined
}
