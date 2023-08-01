import type {
  IComponentType,
  IElement,
  IPropData,
} from '@codelab/frontend/abstract/core'
import React, { useRef } from 'react'
import slugify from 'voca/slugify'

export const RefWrapper = (
  element: IElement,
  ReactComponent: IComponentType,
) => {
  const store = element.store.current
  const slug = slugify(element.name)
  store.refsValues[slug] = useRef()

  return (props: IPropData) =>
    React.createElement(
      ReactComponent,
      { ...props, forwardedRef: store.refsValues[slug] },
      props['children'],
    )
}
