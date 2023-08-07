import type {
  IComponentType,
  IElement,
  IPropData,
} from '@codelab/frontend/abstract/core'
import React, { useRef } from 'react'

export const getRefWrapper =
  (element: IElement, key: string, ReactComponent: IComponentType) =>
  (props: IPropData) => {
    const store = element.store.current
    store.refsValues[key] = useRef()

    return React.createElement(
      ReactComponent,
      { ...props, forwardedRef: store.refsValues[key] },
      props['children'],
    )
  }
