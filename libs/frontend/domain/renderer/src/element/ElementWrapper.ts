import type {
  IElement,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { CUSTOM_TEXT_PROP_KEY } from '@codelab/frontend/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { jsx } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
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
    const state = renderService.appStore.current.state
    const componentMeta = renderService.renderComponentMeta

    const slug = componentMeta[element.baseId]
      ? `${element.slug}.${componentMeta[element.baseId]}`
      : element.slug

    const onRefChange = useCallback((node: Nullable<HTMLElement>) => {
      if (node !== null) {
        state.setSilently(element.id, node)
        state.setSilently(slug, node)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
        renderOutput.props['ref'] = onRefChange
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
