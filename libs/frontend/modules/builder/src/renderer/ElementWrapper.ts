import { Element } from '@codelab/frontend/modules/element'
import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { atoms } from '../atoms/atoms'
import type { RenderService } from './RenderService'
import { mapOutput } from './utils/renderOutputUtils'

export interface ElementWrapperProps {
  renderService: RenderService
  element: Element
}

// An observer element wrapper - this makes sure that each element is self-contained and observers only the data it needs
export const ElementWrapper = observer<ElementWrapperProps>(
  ({ renderService, element }) => {
    // Render the element to an intermediate output
    const outputOrArray = renderService.renderElementIntermediate(element)

    renderService.logRendered(element, outputOrArray)

    const result = mapOutput(outputOrArray, (renderOutput) => {
      // Render the output to a React element
      let children = renderService.renderChildren(renderOutput)

      const hasNoChildren =
        !children || (Array.isArray(children) && !children.length)

      // Allow for a 'children' prop, but only if we have no regular children
      if (renderOutput?.props?.['children'] && hasNoChildren) {
        children = React.createElement(
          Fragment,
          {},
          renderOutput.props['children'],
        )
      }

      // Render the atom if it exists, otherwise use fragment
      const ReactComponent = renderOutput.atomType
        ? atoms[renderOutput.atomType] ?? Fragment
        : Fragment

      return React.createElement(
        ReactComponent,
        ReactComponent === Fragment
          ? { key: renderOutput.props?.['key'] }
          : renderOutput.props,
        children,
      )
    })

    // If we have an array, wrap it in a fragment
    return Array.isArray(result)
      ? React.createElement(Fragment, {}, result)
      : result
  },
)
