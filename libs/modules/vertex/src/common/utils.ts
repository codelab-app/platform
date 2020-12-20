import {
  FindVertexBy,
  FindVertexByGraphID,
  FindVertexByID,
} from './CommonTypes'

export const isId = (value: FindVertexBy): value is FindVertexByID => {
  return (value as FindVertexByID).id !== undefined
}

export const isGraphId = (
  value: FindVertexBy,
): value is FindVertexByGraphID => {
  return (value as FindVertexByGraphID).graph_id !== undefined
}
