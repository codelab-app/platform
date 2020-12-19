import { FindEdgeBy, FindEdgeByID } from './CommonTypes'

export const isId = (value: FindEdgeBy): value is FindEdgeByID => {
  return (value as FindEdgeByID).id !== undefined
}
