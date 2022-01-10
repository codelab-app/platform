import { IElement } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { merge } from 'lodash'
import React from 'react'
import { RenderContainer } from '../renderContainer'
import { containerKey } from '../utils'
import { RenderPipeFactory } from './types'

const getComponentInstance = (element: IElement, tree: ElementTree) => {
  if (!element.instanceOfComponent?.id) {
    return undefined
  }

  return tree.getComponentById(element.instanceOfComponent.id)
}

/** If the element is a component add 'data-component-id' to the extra props */
export const overrideComponentPropsPipe: RenderPipeFactory =
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
      <RenderContainer key={containerKey(componentInstance)} context={context}>
        {updateContext.render(componentInstance, updateContext, props)}
      </RenderContainer>
    )
  }
