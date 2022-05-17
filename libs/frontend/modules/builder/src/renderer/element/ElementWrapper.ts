import {
  IElement,
  IPropData,
  IRenderService,
} from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { jsx } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext } from 'react'
import { GlobalPropsContext } from '../props/globalPropsContext'
import { mapOutput } from '../utils/renderOutputUtils'
import {
  childrenAreEmpty,
  extractValidProps,
  getReactComponent,
  makeChildrenPropElement,
  withMaybeGlobalPropsProvider,
} from './wrapper.utils'

export interface ElementWrapperProps {
  renderService: IRenderService
  element: IElement
  /**
   * Props passed in from outside the component
   */
  extraProps?: IPropData
}

/**
 * An observer element wrapper - this makes sure that each element is self-contained and observes only the data it needs
 *
 * It is in this wrapper that the children are rendered
 */
export const ElementWrapper = observer<ElementWrapperProps>(
  ({ renderService, element, extraProps }) => {
    const globalPropsContext = useContext(GlobalPropsContext)
    const globalProps = globalPropsContext?.[element.id]

    // Render the element to an intermediate output
    const renderOutputs = renderService.renderIntermediateElement(
      element,
      mergeProps(extraProps, globalProps),
    )

    renderService.logRendered(element, renderOutputs)

    // Use mapOutput because the output may be array or a single item
    const Children = mapOutput(renderOutputs, (renderOutput) => {
      // Render the element's children
      let children = renderService.renderChildren(renderOutput)
      const hasNoChildren = childrenAreEmpty(children)

      // Allow for a 'children' prop, but only if we have no regular children
      if (renderOutput?.props?.['children'] && hasNoChildren) {
        children = makeChildrenPropElement(renderOutput.props)
      }

      const ReactComponent = getReactComponent(renderOutput)
      const extractedProps = extractValidProps(ReactComponent, renderOutput)

      const IntermediateChildren = jsx(
        ReactComponent,
        mergeProps(extraProps, extractedProps),
        children,
      )

      const withMaybeProviders = withMaybeGlobalPropsProvider(
        renderOutput,
        globalPropsContext,
      )

      return withMaybeProviders(IntermediateChildren)
    })

    // If we have an array, wrap it in a fragment
    return Array.isArray(Children)
      ? React.createElement(Fragment, {}, Children)
      : Children
  },
)

ElementWrapper.displayName = 'ElementWrapper'
