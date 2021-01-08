import { FindAppBy, FindAppByID, FindAppByTitle } from './CommonTypes'

export const isTitle = (value: FindAppBy): value is FindAppByTitle => {
  return typeof (value as FindAppByTitle).title !== 'undefined'
}
export const isId = (value: FindAppBy): value is FindAppByID => {
  return typeof (value as FindAppByID).id !== 'undefined'
}
