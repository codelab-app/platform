import { reduce } from 'lodash'
import {
  PropItem,
  Props,
  PropsIteratee,
  PropsIterator,
} from '@codelab/alpha/shared/interface/props'

/**
 * Goes through each object key/value pair, and apply the iteratee
 */
export const propsIterator: PropsIterator = (
  props,
  iteratee: PropsIteratee,
) => {
  return reduce<Props, Props>(
    props,
    (acc: Props, value: PropItem, key: keyof Props) => {
      return iteratee(acc, value, key)
    },
    {},
  )
}
