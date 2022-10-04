import { IElement, IPropData, IRenderer } from '@codelab/frontend/abstract/core'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/domain/element'
import { Nullish } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { jsx } from '@emotion/react'
import merge from 'lodash/merge'
import { observer } from 'mobx-react-lite'
import React, { Fragment, useContext, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { GlobalPropsContext } from '../props/globalPropsContext'
import { mapOutput } from '../utils/renderOutputUtils'
import { DraggableElement } from './DraggableElement'
import {
  childrenAreEmpty,
  extractValidProps,
  getReactComponent,
  makeCustomTextContainer,
  withMaybeGlobalPropsProvider,
} from './wrapper.utils'

export interface ElementWrapperProps {
  renderService: IRenderer
  element: IElement
  /**
   * Props passed in from outside the component
   */
  extraProps?: IPropData

  postAction?: Nullish<() => unknown>
}

/**
 * An observer element wrapper - this makes sure that each element is self-contained and observes only the data it needs
 *
 * It is in this wrapper that the children are rendered
 */
export const ElementWrapper = observer<ElementWrapperProps>(
  ({ renderService, element, extraProps = {}, postAction }) => {
    const globalPropsContext = useContext(GlobalPropsContext)
    const globalProps = globalPropsContext?.[element.id]

    useEffect(() => {
      postAction?.()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
      if (
        hasNoChildren &&
        renderOutput.props &&
        renderOutput.props[CUSTOM_TEXT_PROP_KEY] &&
        element.atom?.current.allowCustomTextInjection
      ) {
        children = makeCustomTextContainer(
          renderOutput.props[CUSTOM_TEXT_PROP_KEY],
        )
      }

      const ReactComponent = getReactComponent(renderOutput)
      const extractedProps = extractValidProps(ReactComponent, renderOutput)

      const IntermediateChildren = jsx(
        ReactComponent,
        // merge because some refs are not resolved
        merge(extraProps, extractedProps),
        children,
      )

      const withMaybeProviders = withMaybeGlobalPropsProvider(
        renderOutput,
        globalPropsContext,
      )

      return withMaybeProviders(IntermediateChildren)
    })

    // If we have an array, wrap it in a fragment

    return React.createElement(
      ErrorBoundary,
      {
        fallbackRender: ({ error }) =>
          React.createElement(
            'div',
            {},
            `Error at ${element.name}: ${error.message}`,
          ),
        onError(error, info) {
          console.log('An error is thrown!')
          console.log(error)
          console.log(info)
          // element.setErrorMessage(`Something went wrong: ${error.message}`)
        },
        resetKeys: [renderOutputs],
        onResetKeysChange: (prev, next) => {
          console.log('onResetKeysChange of ', element.name)
          console.log(prev)
          console.log(next)
          // element.setErrorMessage(null)
        },
      },
      Array.isArray(Children)
        ? React.createElement(Fragment, {}, Children)
        : Children,
    )
  },
)

ElementWrapper.displayName = 'ElementWrapper'
