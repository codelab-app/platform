import {
  CUSTOM_TEXT_PROP_KEY,
  IElement,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { Maybe, Nullable, Nullish } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { jsx } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import React, { RefObject, useCallback, useContext, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ComponentPropsContext } from '../props/componentPropsContext'
import { GlobalPropsContext } from '../props/globalPropsContext'
import { mapOutput } from '../utils/renderOutputUtils'
import { DraggableElementWrapper } from './DraggableElementWrapper'
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
  ({ renderService, element, extraProps = {}, postAction, ...rest }) => {
    const globalPropsContext = useContext(GlobalPropsContext)
    const globalProps = globalPropsContext[element.id]
    const componentPropsContext = useContext(ComponentPropsContext)

    if (element.parentComponent) {
      componentPropsContext[element.id] =
        element.parentComponent.maybeCurrent?.props?.data.data || {}
    }

    const onRefChange = useCallback(
      (node: Nullable<RefObject<HTMLElement>>) => {
        if (!element.ref && node) {
          element.setRef(node)
        }
      },
      [],
    )

    useEffect(() => {
      postAction?.()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let propsPassedFromParentComponent: Maybe<IPropData>

    if (element.parentElement) {
      propsPassedFromParentComponent =
        componentPropsContext[element.parentElement.id]
    }

    // Render the element to an intermediate output
    const renderOutputs = renderService.renderIntermediateElement(
      element,
      mergeProps(extraProps, globalProps, propsPassedFromParentComponent),
    )

    renderService.logRendered(element, renderOutputs)

    // Use mapOutput because the output may be array or a single item
    const Rendered = mapOutput(renderOutputs, (renderOutput) => {
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

      if (renderOutput.props) {
        renderOutput.props['forwardedRef'] = onRefChange
      }

      const ReactComponent = getReactComponent(renderOutput)
      const extractedProps = extractValidProps(ReactComponent, renderOutput)

      const IntermediateChildren = jsx(
        ReactComponent,
        // merge because some refs are not resolved
        mergeProps(extractedProps, rest),
        children,
      )

      const withMaybeProviders = withMaybeGlobalPropsProvider(
        renderOutput,
        globalPropsContext,
      )

      return withMaybeProviders(IntermediateChildren)
    })

    return React.createElement(
      ErrorBoundary,
      {
        fallbackRender: () => null,
        onError({ message, stack }) {
          element.setRenderingError({ message, stack })
        },
        resetKeys: [renderOutputs],
        onResetKeysChange: () => {
          element.setRenderingError(null)
        },
      },
      React.createElement(DraggableElementWrapper, {
        children: Rendered,
        element,
      }),
    )
  },
)

ElementWrapper.displayName = 'ElementWrapper'
