import { reduce } from 'lodash'
import { Props } from '@codelab/shared/interface/props'
import { isRenderPropValue } from './Props.guards'

/**
 * Remove non-render props
 */
export function filterRenderProps(
  props: Props,
  filter?: '1-level' | 'leaf',
): Props {
  return reduce<Props, Props>(
    props,
    (prop: Props, propValue: Props[keyof Props], propKey: keyof Props) => {
      if (filter === '1-level') {
        if (isRenderPropValue(propValue) && propValue.renderProps === true) {
          return {
            ...prop,
            [propKey]: propValue,
          }
        }
      }

      if (filter === 'leaf') {
        if (isRenderPropValue(propValue) && propValue.renderProps === 'leaf') {
          return {
            ...prop,
            [propKey]: propValue,
          }
        }
      }

      if (!filter) {
        if (isRenderPropValue(propValue)) {
          return {
            ...prop,
            [propKey]: propValue,
          }
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
export function convertToLeafRenderProps(props: Props): Props {
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
