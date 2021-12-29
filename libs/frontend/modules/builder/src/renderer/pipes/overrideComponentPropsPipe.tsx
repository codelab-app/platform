import { IElement } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { merge } from 'lodash'
import React from 'react'
import { RenderContainer } from '../renderContainer'
import { RenderPipeFactory } from './types'

const getComponentInstance = (element: IElement, tree: ElementTree) => {
  if (!element.instanceOfComponent?.id) {
    return undefined
  }

  return tree.getComponentById(element.instanceOfComponent.id)
}

/** If the element is a component add 'data-component-id' to the extra props */
export const overrideComponentProps: RenderPipeFactory =
  (next) => (element, context, props) => {
    const componentInstance = getComponentInstance(element, context.tree)

    if (!componentInstance) {
      return next(element, context, props)
    }

    const extraElementProps = {
      [componentInstance.id]: props,
    }

    // We override the component props with the element instance props
    const updateContext = merge(context, {
      extraElementProps,
    })

    return (
      <RenderContainer
        element={componentInstance}
        context={updateContext}
        props={props} // just this won't work, because it's the first props in the pipe and everything else will override it
      />
    )
  }
