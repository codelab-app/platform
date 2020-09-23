import { omit, reduce } from 'lodash'
import {
  PropItem,
  Props,
  PropsFactory,
  PropsIterator,
} from '@codelab/shared/interface/props'

/**
 * Goes through each object key/value pair, and apply the iteratee
 */
export const propsIterator: PropsIterator = <P extends Props = Props>(
  props: P,
  iteratee: PropsFactory,
  initAcc?: any,
) => {
  return omit(
    reduce<P, Props>(
      props,
      (acc: Props, propValue: PropItem, propKey: keyof Props) => {
        return iteratee(acc, propValue, propKey)
      },
      initAcc ?? {},
    ),
    'ctx',
  )
}
