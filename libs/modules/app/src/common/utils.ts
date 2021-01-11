import { ByAppCondition, ByAppId, ByAppTitle } from './CommonTypes'

export const isTitle = (value: ByAppCondition): value is ByAppTitle => {
  return typeof (value as ByAppTitle).title !== 'undefined'
}
export const isId = (value: ByAppCondition): value is ByAppId => {
  return typeof (value as ByAppId).id !== 'undefined'
}
