import { reduce } from 'lodash'
import { propsIterator } from './Props-iterator'
import {
  isLeafRenderPropValue,
  isRenderPropValue,
  isSingleRenderPropValue,
} from './Props.guards'
import { PropItem, Props, PropsFactory } from '@codelab/shared/interface/props'

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

// export const propsIterator = <P extends Props = Props>(
//   props: P,
//   predicate: any = () => true,
//   onTruthy: Function,
//   onFalsy?: Function,
// ) => {
//   return reduce<Props, Props>(
//     props,
//     (prop: Props, propValue: Props[keyof Props], propKey: keyof Props) => {
//       return predicate(prop, propValue, propKey) || onFalsy === undefined
//         ? onTruthy(prop, propValue, propKey)
//         : onFalsy(prop, propValue, propKey)
//     },
//     {},
//   )
// }

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

export const leafRenderPropsFactory: PropsFactory = (
  acc: Props,
  propValue: PropItem,
  propKey: keyof Props,
): Props => {
  if (isLeafRenderPropValue(propValue)) {
    return { ...acc, [propKey]: propValue }
  }

  return { ...acc }
}

export const singleRenderPropsFactory: PropsFactory = (
  acc: Props,
  propValue: PropItem,
  propKey: keyof Props,
): Props => {
  if (isSingleRenderPropValue(propValue)) {
    return { ...acc, [propKey]: propValue }
  }

  return { ...acc }
}

export const leafRenderPropsFilter = <P extends Props = Props>(props: P) => {
  return propsIterator(props, leafRenderPropsFactory)
}

export const singleRenderPropsFilter = <P extends Props = Props>(props: P) => {
  return propsIterator(props, singleRenderPropsFactory)
}
