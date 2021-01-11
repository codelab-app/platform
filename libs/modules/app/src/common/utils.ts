import { ByAppCondition, ByAppTitle, ByUniqueAppId } from './CommonTypes'

export const isTitle = (value: ByAppCondition): value is ByAppTitle => {
  return typeof (value as ByAppTitle).title !== 'undefined'
}
export const isId = (value: ByAppCondition): value is ByUniqueAppId => {
  return typeof (value as ByUniqueAppId).id !== 'undefined'
}
