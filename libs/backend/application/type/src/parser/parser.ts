import type { IAntDesignField } from '@codelab/backend-abstract-core'
import type { ObjectLike } from '@codelab/shared-abstract-types'

import { stripQuotes } from '@codelab/shared-utils'
import { mergeDeep } from 'remeda'

import { stripBracketsRegex } from './matchers'

/**
 * {left?: ReactNode, right?: ReactNode}
 * ->
 * left: ReactNode, right: ReactNode
 * @param object
 */
export const extractObjectFromString = (object: string): ObjectLike => {
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

        return { [`${key}`]: value }
      })
      .reduce((acc, curr) => mergeDeep(acc, curr), {}) ?? {}
  )
}

/**
 * Convert type string to array of types
 *
 * "'error' | 'warning'" -> ['error', 'warning']
 */
export const parseSeparators = (field: Pick<IAntDesignField, 'type'>) => {
  const processedField = stripQuotes(field.type)

  return processedField.split('|').map((value) => value.trim())
}
