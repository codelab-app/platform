import { IElement } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { merge } from 'lodash'
import { RenderPipeFactory } from './types'

const getComponentInstance = (element: IElement, tree: ElementTree) => {
  if (!element.instanceOfComponent?.id) {
    return undefined
  }

  return tree.getComponentById(element.instanceOfComponent.id)
}

/** Overrides the component props with the component instance props */
export const overrideComponentPropsPipe: RenderPipeFactory =
  (next) => (element, context, props) => {
    const componentInstance = getComponentInstance(element, context.tree)

    if (!componentInstance) {
      return next(element, context, props)
    }

    const extraElementProps = { [componentInstance.id]: props }
    // We override the component props with the element instance props
    const updateContext = merge(context, { extraElementProps })
    console.log(updateContext.extraElementProps)

    return updateContext.render(componentInstance, updateContext, props)
  }
