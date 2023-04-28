import type {
  IElement,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { isAtomInstance, RendererType } from '@codelab/frontend/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { jsx } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { shouldRenderElement } from '../utils'
import { mapOutput } from '../utils/renderOutputUtils'
import { extractValidProps, getReactComponent } from './wrapper.utils'

export interface ElementWrapperProps {
  element: IElement
  /**
   * Props passed in from outside the component
   */
  extraProps?: IPropData
  renderer: IRenderer
}

/**
 * An observer element wrapper - this makes sure that each element is self-contained and observes only the data it needs
 *
 * It is in this wrapper that the children are rendered
 */
export const ElementWrapper = observer<ElementWrapperProps>(
  ({ element, extraProps = {}, renderer, ...rest }) => {
    /* 
    const onRefChange = useCallback((node: Nullable<HTMLElement>) => {
      if (node !== null) {
        // FIXME:
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
   */
    // Render the element to an intermediate output
    const renderOutputs = renderer.renderIntermediateElement(
      element,
      extraProps,
    )

    renderer.logRendered(element, renderOutputs)

    // TODO: re-work on implementation for the draggable elements and allowable children on the droppable elements.
    // Render the elements normally for now since the DnD is currently not properly working and
    // causing unnecessary re-renders when hovering over the builder screen section
    const renderedElement = mapOutput(renderOutputs, (renderOutput) => {
      const children = shouldRenderElement(element, renderOutput.props)
        ? renderer.renderChildren({
            extraProps,
            parentOutput: renderOutput,
          })
        : undefined

      if (renderOutput.props) {
        // renderOutput.props['forwardedRef'] = onRefChange

        if (
          isAtomInstance(element.renderType) &&
          element.renderType.current.type === IAtomType.GridLayout
        ) {
          renderOutput.props['static'] =
            renderer.rendererType === RendererType.Preview
        }
      }

      const ReactComponent = getReactComponent(renderOutput)
      const extractedProps = extractValidProps(ReactComponent, renderOutput)

      return jsx(ReactComponent, mergeProps(extractedProps, rest), children)
    })

    return React.createElement(
      ErrorBoundary,
      {
        fallbackRender: () => null,
        onError: ({ message, stack }) => {
          element.setRenderingError({ message, stack })
        },
        onResetKeysChange: () => {
          element.setRenderingError(null)
        },
        resetKeys: [renderOutputs],
      },
      renderedElement,
    )
  },
)

ElementWrapper.displayName = 'ElementWrapper'
