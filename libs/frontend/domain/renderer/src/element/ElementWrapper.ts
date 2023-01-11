import type {
  IElement,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { jsx } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useContext, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { GlobalPropsContext } from '../props/globalPropsContext'
import { mapOutput } from '../utils/renderOutputUtils'
import {
  extractValidProps,
  getReactComponent,
  makeDraggableElement,
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
    /**
     * Generates an ArrayOrSingle of functions that accepts additional props
     * and will return the React Elements with the attached additional props
     */
    const renderOutputWithProps = mapOutput(renderOutputs, (renderOutput) => {
      const children = renderOutput.stop
        ? undefined
        : renderService.renderChildren(renderOutput)

      if (renderOutput.props) {
        renderOutput.props['forwardedRef'] = onRefChange
      }

      const ReactComponent = getReactComponent(renderOutput)
      const extractedProps = extractValidProps(ReactComponent, renderOutput)

      const withMaybeProviders = withMaybeGlobalPropsProvider(
        renderOutput,
        globalPropsContext,
      )

      return (props?: IPropData) => {
        const IntermediateChildren = jsx(
          ReactComponent,
          // merge because some refs are not resolved
          mergeProps(extractedProps, rest, props),
          children,
        )

        return withMaybeProviders(IntermediateChildren)
      }
    })

    // to be used for dnd to be able to add necessary props later
    const makeRenderedElements = (moreProps?: IPropData) => {
      if (Array.isArray(renderOutputWithProps)) {
        return renderOutputWithProps.map((fn) => fn(moreProps))
      }

      return renderOutputWithProps(moreProps)
    }

    // we need to include additional props from dnd so we need to render the element there
    const WrappedElement = renderService.isBuilder
      ? makeDraggableElement({ element, makeRenderedElements })
      : makeRenderedElements()

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
      WrappedElement,
    )
  },
)

ElementWrapper.displayName = 'ElementWrapper'
