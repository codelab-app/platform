import { Element } from '@codelab/frontend/modules/element'
import { PropsData } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { atoms } from '../atoms/atoms'
import { RenderOutput } from './abstract/RenderOutput'
import type { RenderService } from './RenderService'
import { mapOutput } from './utils/renderOutputUtils'

export interface ElementWrapperProps {
  renderService: RenderService
  element: Element
  extraProps?: PropsData
}

// An observer element wrapper - this makes sure that each element is self contained and observers only the data it needs
export const ElementWrapper = observer<ElementWrapperProps>(
  ({ renderService, element, extraProps }) => {
    const outputOrArray = renderService.renderElementIntermediate(element)

    const result = mapOutput(outputOrArray, (originalOutput) => {
      const renderOutput = RenderOutput.overrideProps(
        originalOutput,
        extraProps,
      )

      let children = renderService.renderChildren(renderOutput)

      const hasNoChildren =
        !children || (Array.isArray(children) && !children.length)

      if (renderOutput?.props?.['children'] && hasNoChildren) {
        // Allow for a 'children' prop, but only if we have no regular children
        children = React.createElement(
          Fragment,
          {},
          renderOutput.props['children'],
        )
      }

      // Get atom if it exists, otherwise use fragment
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

    return Array.isArray(result)
      ? React.createElement(Fragment, {}, result)
      : result
  },
)
