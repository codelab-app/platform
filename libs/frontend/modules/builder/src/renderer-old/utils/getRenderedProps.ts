import { DATA_ID } from '@codelab/frontend/abstract/core'
import { PropsDataByElementId } from '@codelab/shared/abstract/core'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { isArray, merge } from 'lodash'
import { ReactElement } from 'react'

const getElementId = (renderedElement: ReactElement): Maybe<string> =>
  renderedElement?.props?.[DATA_ID]

export const getRenderedProps = (
  renderElement: ReactElement,
): Nullable<PropsDataByElementId> => {
  if (!renderElement) {
    return null
  }

  if (isArray(renderElement)) {
    return renderElement.map(getRenderedProps).reduce(merge)
  }

  const { children } = renderElement?.props || {}
  const childrenQueue = children && isArray(children) ? children : [children]

  const childrenProps = childrenQueue
    .filter((x) => !!x)
    .map(getRenderedProps)
    .reduce(merge, {})

  const elementId = getElementId(renderElement)
  const elementProps = elementId ? { [elementId]: renderElement.props } : {}

  return { ...elementProps, ...childrenProps }
}
