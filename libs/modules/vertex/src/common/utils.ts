import { FindVertexBy, FindVertexByID } from './CommonTypes'

export const isId = (value: FindVertexBy): value is FindVertexByID => {
  return (value as FindVertexByID).id !== undefined
}
