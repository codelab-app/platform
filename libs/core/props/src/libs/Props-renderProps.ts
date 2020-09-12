import { reduce } from 'lodash'
import { Props } from '@codelab/shared/interface/props'
import {
  isSingleRenderPropValue,
  isLeafRenderPropValue,
  isRenderPropValue,
} from './Props.guards'

type PropIteratee = (
  prop: Props,
  propValue: Props[keyof Props],
  propKey: keyof Props,
) => any

/**
 * Determine how far down we pass the props
 */
export type RenderPropsFilter =
  // Single level
  | 'single'
  // All the way
  | 'leaf'

export const propsIterator = <P extends Props = Props>(
  props: P,
  predicate: any = () => true,
  onTruthy: Function,
  onFalsy?: Function,
) => {
  return reduce<Props, Props>(
    props,
    (prop: Props, propValue: Props[keyof Props], propKey: keyof Props) => {
      return predicate(prop, propValue, propKey) || onFalsy === undefined
        ? onTruthy(prop, propValue, propKey)
        : onFalsy(prop, propValue, propKey)
    },
    {},
  )
}

/**
 * Remove non-render props
 */
export const filterRenderProps = (
  props: Props = {},
  filter?: RenderPropsFilter,
): Props => {
  return reduce<Props, Props>(
    props,
    (prop: Props, propValue: Props[keyof Props], propKey: keyof Props) => {
      if (
        (filter === undefined && isRenderPropValue(propValue)) ||
        (filter === 'single' && isSingleRenderPropValue(propValue)) ||
        (filter === 'leaf' && isLeafRenderPropValue(propValue))
      ) {
        return {
          ...prop,
          [propKey]: propValue,
        }
      }

      return {
        ...prop,
      }
    },
    {},
  )
}

/**
 * RootProps should be passed all the way down.
 * @param props
 */
export const convertToRenderProps = (props: Props): Props => {
  return reduce<Props, Props>(
    props,
    (prop: Props, propValue: Props[keyof Props], propKey: keyof Props) => {
      return {
        ...prop,
        [propKey]: {
          renderProps: true,
          value: propValue,
        },
      }
    },
    {},
  )
}

export const convertToLeafRenderProps = (props: Props): Props => {
  return reduce<Props, Props>(
    props,
    (prop: Props, propValue: Props[keyof Props], propKey: keyof Props) => {
      return {
        ...prop,
        [propKey]: {
          renderProps: 'leaf',
          value: propValue,
        },
      }
    },
    {},
  )
}
