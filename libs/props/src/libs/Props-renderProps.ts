import { reduce } from 'lodash'
import { Props } from '@codelab/shared/interface'
import { isRenderPropValue } from './Props.guards'

/**
 * Remove non-render props
 */
export function filterRenderProps(props: Props): Props {
  return reduce<Props, Props>(
    props,
    (prop: Props, propValue: Props[keyof Props], propKey: keyof Props) => {
      if (isRenderPropValue(propValue) && !propValue.renderProps.leaf) {
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

export function filterLeafRenderProps(props: Props): Props {
  return reduce<Props, Props>(
    props,
    (prop: Props, propValue: Props[keyof Props], propKey: keyof Props) => {
      if (isRenderPropValue(propValue) && propValue.renderProps.leaf) {
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
export function convertToRenderProps(props: Props): Props {
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
