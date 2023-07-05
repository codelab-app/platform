import type { IElement, IRenderer } from '@codelab/frontend/abstract/core'
import {
  getRunnerId,
  isAtomInstance,
  RendererType,
} from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { IAtomType } from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components'
import { shouldRenderElement } from '../utils'
import { mapOutput } from '../utils/render-output-utils'
import { extractValidProps, getReactComponent } from './wrapper.utils'

export interface ElementWrapperProps {
  element: IElement
  /**
   * Props passed in from outside the component
   */
  renderer: IRenderer
}

// Only wrap the component with styled() if it's a valid component (not a string or React.Fragment)
export const getStyledComponent = (ReactComponent: IComponentType) => {
  if (
    typeof ReactComponent === 'function' &&
    ReactComponent !== React.Fragment
  ) {
    return styled(ReactComponent)``
  }

  return ReactComponent ?? React.Fragment
}

/**
 * An observer element wrapper - this makes sure that each element is self-contained and observes only the data it needs
 *
 * It is in this wrapper that the children are rendered
 */
export const ElementWrapper = observer<ElementWrapperProps>(
  ({ element, renderer, ...rest }) => {
    useEffect(() => {
      const { postRenderAction, store } = element

      if (!postRenderAction) {
        return
      }

      const actionRunnerId = getRunnerId(store.id, postRenderAction.id)
      const postRenderActionRunner = renderer.actionRunners.get(actionRunnerId)
      const runner = postRenderActionRunner?.runner.bind(store.current.state)

      runner?.()
    }, [])

    const { atomService } = useStore()
    // Render the element to an intermediate output
    const renderOutputs = renderer.renderIntermediateElement(element)

    renderer.logRendered(element, renderOutputs)

    // TODO: re-work on implementation for the draggable elements and allowable children on the droppable elements.
    // Render the elements normally for now since the DnD is currently not properly working and
    // causing unnecessary re-renders when hovering over the builder screen section
    const renderedElement = mapOutput(renderOutputs, (renderOutput) => {
      const children = shouldRenderElement(element, renderOutput.props)
        ? renderer.renderChildren(renderOutput)
        : undefined

      if (renderOutput.props) {
        if (
          isAtomInstance(element.renderType) &&
          element.renderType.current.type === IAtomType.GridLayout
        ) {
          renderOutput.props['static'] =
            renderer.rendererType === RendererType.Preview
        }
      }

      const ReactComponent: IComponentType =
        renderOutput.atomType &&
        atomService.dynamicComponents[renderOutput.atomType]
          ? atomService.dynamicComponents[renderOutput.atomType] ??
            React.Fragment
          : getReactComponent(renderOutput)

      const extractedProps = extractValidProps(ReactComponent, renderOutput)
      const StyledReactComponent = getStyledComponent(ReactComponent)

      return React.createElement(
        StyledReactComponent,
        mergeProps(extractedProps, rest),
        children,
      )
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
