import { Props } from '@codelab/frontend/abstract/props'
import { PropsData } from '@codelab/shared/abstract/core'

// Reduce the array of key value css props to a simple object
export const reduceStyleProps = (props?: Array<any>) => {
  return props?.reduce((prev: PropsData, prop: PropsData) => {
    const key = prop.cssProps

    if (!key) {
      return prev
    }

    // eslint-disable-next-line no-param-reassign
    prev[key] = prop[key] || []

    return prev
  }, {})
}

export const reverseReduceStyleProps = (props?: any) => {
  const propsArray: Array<Props> = []

  for (const propsKey in props) {
    if (Object.prototype.hasOwnProperty.call(props, propsKey)) {
      const prop = props[propsKey]

      propsArray.push({
        cssProps: propsKey,
        [propsKey]: prop,
      })
    }
  }

  return propsArray
}
