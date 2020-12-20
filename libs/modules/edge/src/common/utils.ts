import { FindEdgeBy, FindEdgeByGraphID, FindEdgeByID } from './CommonTypes'

export const isId = (value: FindEdgeBy): value is FindEdgeByID => {
  return (value as FindEdgeByID).id !== undefined
}

export const isGraphId = (value: FindEdgeBy): value is FindEdgeByGraphID => {
  return (value as FindEdgeByGraphID).graph_id !== undefined
}
