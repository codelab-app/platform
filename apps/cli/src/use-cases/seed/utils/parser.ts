import merge from 'lodash/merge'
import { stripBracketsRegex } from './matchers'

/**
 * {left?: ReactNode, right?: ReactNode}
 * ->
 * left: ReactNode, right: ReactNode
 * @param object
 */
export const extractObjectFromString = (object: string): object => {
  const objectWithoutBraces = object.match(stripBracketsRegex)?.[1]

  return (
    objectWithoutBraces
      ?.split(',')
      .map((keyValueStrings) => {
        const keyValueData = keyValueStrings
          // Split by key value colon
          .split(':')
          // Trim and replace optional types
          .map((val) => val.trim().replace('?', ''))

        const key = keyValueData[0]
        const value = keyValueData[1]

        return { [key]: value }
      })
      .reduce(merge) ?? {}
  )
}
